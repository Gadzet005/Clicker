//
//  Network.swift
//  Mobile
//
//  Created by Алексей Маренков on 16.07.2024.
//

import Foundation

struct PreURLRequest <Body: Encodable> {
    var url: URL
    var httpMethod: String
    var body: Body
    var queries: [String:String] = [:]
}

final class Worker {
    struct DataResponse {
        var data: Data?
        var response: URLResponse?
    }
    
    static private var session: URLSession = URLSession.shared
    private var decoder: JSONDecoder = JSONDecoder()
    private var encoder: JSONEncoder = JSONEncoder()
    private var keyChainWorker = KeychainService()
    static var accessToken: String? = nil
    var onTokenInit: (()->Void)? = nil
    
    func updateTokens() {
        struct TockenM: Decodable {
            var accessToken: String
        }
        let refreshToken = keyChainWorker.getData(forKey: "refreshToken")
        if  refreshToken != nil {
            func OnCompletion(result: Result<TockenM?, Error>)->Void {
                switch result {
                    case .success(let response):
                    if let data = response {
                        Self.accessToken = data.accessToken
                        if onTokenInit != nil {
                            onTokenInit!()
                        }
                    } else {
                        print("Unexpected data")
                    }
                    case .failure(let error):
                        print(error)
                 }
            }
            
            //queries: ["refreshToken": String(data: refreshToken!, encoding: .utf8)!]
            fetch(preRequest: PreURLRequest(url: URL(string: SERVER_ADDR + ":" + SERVER_PORT + REFRESH_TOKEN_ROUTER)!, httpMethod: "GET", body: ""), completion: OnCompletion)
        }
    }
    
    func fetch<T: Decodable, Body: Encodable>(preRequest: PreURLRequest<Body>, completion: ((Result<T?, Error>)->Void)?) {
        var request = URLRequest(url: preRequest.url)
        request.httpMethod = preRequest.httpMethod
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        if preRequest.httpMethod == "POST"{
            if let encoded = try? encoder.encode(preRequest.body) {
                request.httpBody = encoded
            }
        }
        var queryItems: [URLQueryItem] = []
        if Self.accessToken != nil {
            //queryItems.append(URLQueryItem(name: "accessToken", value: Self.accessToken))
            //queryItems.append(URLQueryItem(name: "authenticateToken", value: Self.accessToken))
            request.setValue("Bearer " + Self.accessToken!, forHTTPHeaderField: "Authorization")
        }
        for (key, val) in preRequest.queries {
            queryItems.append(URLQueryItem(name: key, value: val))
        }
        var components = URLComponents(string: preRequest.url.absoluteString)!
        components.queryItems = queryItems

        request.url = components.url!

        fetch(request: request) { [weak self] result in
            print(result)
            switch result {
            case .success(let dataResponse):
                guard let _ = self?.decoder, // what for that code? rm
                      let data = dataResponse.data
                else {
                    completion?(.success(nil))
                    return
                }
                let decoded = try? self!.decoder.decode(T.self, from: data)
                completion?(.success(decoded))
            case .failure(let error):
                print(error)
                completion?(.failure(error))
            }}
    }
    
    func fetch(request: URLRequest, completion: ((Result<DataResponse, Error>) -> Void)?) {
        Self.session.dataTask(with: request) { data, response, error in
            if let error {
                completion?(.failure(error))
                print(error)
                return
            }
            
            var dataResponse: DataResponse = DataResponse()
            if let data {
                dataResponse.data = data
            }
            
            if let response {
                dataResponse.response = response
            }
            
            //print(Self.session.configuration.httpCookieStorage)
            //print(Self.session.configuration.httpCookieStorage?.cookies) // check for refresh token
            if Self.session.configuration.httpCookieStorage != nil && Self.session.configuration.httpCookieStorage!.cookies != nil {
                let cookies = Self.session.configuration.httpCookieStorage!.cookies!
                for cookie in cookies {
                    if cookie.name == "refreshToken" {
                        self.keyChainWorker.setData(cookie.value.data(using: .utf8), forKey: "refreshToken")
                    }
                }
            }
            
            completion?(.success(dataResponse))
        }.resume()
    }
    
    /*func fetchAwait<T: Decodable, Body: Encodable>(preRequest: PreURLRequest<Body>) async -> T? {
        var request = URLRequest(url: preRequest.url)
        request.httpMethod = preRequest.httpMethod
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        if let encoded = try? encoder.encode(preRequest.body) {
            request.httpBody = encoded
        }
        
        for (key, val) in preRequest.queries {
            request.setValue(val, forHTTPHeaderField: key)
        }
        
        guard let dataResponse = await fetchAwait(request: request)
        else {
            return nil
        }
        
        guard let data = dataResponse.data
        else {
            return nil
        }
        return try! self.decoder.decode(T.self, from: data)
    }
    
    func fetchAwait(request: URLRequest) async -> DataResponse? {

        var dataResponse: DataResponse = DataResponse()
        
        let (data, response) = (try? await Self.session.data(for: request)) ?? (nil, nil)
        dataResponse.data = data
        dataResponse.response = response
        
        if data == nil {
            return nil
        }
        
        return dataResponse
    }*/
}
