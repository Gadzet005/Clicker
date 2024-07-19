//
//  Actions.swift
//  Mobile
//
//  Created by Алексей Маренков on 16.07.2024.
//

import Foundation

struct ResponseUserM: Decodable {
    var name: String
    var email: String
    var id: Int64
}

struct ResponseUserTockenM: Decodable {
    var user: ResponseUserM
    var accessToken: String
}

struct UserActions {
    private let netWorker = Worker()

    func updateTokens(onTokenInit: (()->Void)?) {
        netWorker.onTokenInit = onTokenInit
        netWorker.updateTokens()
    }
    /*private let authCompletion: ((Result<ResponseUserTockenM?, Error>) -> Void) = { resp in
        switch resp {
            case .success(let data):
            if let regResp = data {
                User = UserM(regResp: regResp, prevUser: User)
            } else {
                print("Unexpected data")
            }
                //keychainObj.setData(dataResponse.data, forKey: "someKey")
            case .failure(let error):
                print(error)
         }
    }
    
    func responseWrapper(response: Result<ResponseUserTockenM?, Error>, anotherFunc: (ResponseUserTockenM?)->Void) -> Void {
        authCompletion(response)
        anotherFunc(response)
    }*/
    
    // I know that there is another easier solution exist, but I don't mind - understood it too late
    /*class AsyncValue<T> {
        var value: T?
    }
    func RegisterAwaitA(request: UserM, url: URL) -> ResponseUserTockenM?  {
        let semaphore = DispatchSemaphore(value: 0)
        let response = AsyncValue<ResponseUserTockenM>()
        Task {
            defer {semaphore.signal()}
            var resp: ResponseUserTockenM? = await netWorker.fetchAwait(preRequest: PreURLRequest(url: url, httpMethod: "POST", body: request))
            guard let res = resp
            else {
                return
            }
            response.value = res
        }
        
        semaphore.wait()
        
        guard let res = response.value
        else {
            return nil
        }
        
        return res
    }*/
    
    /*func LoginAwaitA(request: UserM, url: URL) async -> ResponseUserTockenM?  {
       return await RegisterAwaitA(request: request, url: url)
    }*/
    
    private func onComplettionWrap(onCompletion: @escaping ((Result<ResponseUserTockenM?, Error>) -> Void)) -> ((Result<ResponseUserTockenM?, Error>) -> Void) {
        return { result in
            onCompletion(result)
            switch result {
            case .success(let response):
            if let regResp = response {
                Worker.accessToken = regResp.accessToken
            } else {
                print("Failed to unwrap accessToken")
            }
            case .failure(let error):
                print(error)
            }
        }
    }
    
    
    func RegisterA(user: UserM, url: URL, onCompletion: @escaping ((Result<ResponseUserTockenM?, Error>) -> Void)) {
        netWorker.fetch(preRequest: PreURLRequest<UserM>(url: url, httpMethod: "POST", body: user), completion: onComplettionWrap(onCompletion: onCompletion))
    }
    
    func LoginA(user: UserM, url: URL, onCompletion: @escaping ((Result<ResponseUserTockenM?, Error>) -> Void)) {
        netWorker.fetch(preRequest: PreURLRequest<UserM>(url: url, httpMethod: "POST", body: user), completion: onComplettionWrap(onCompletion: onCompletion))
    }
}
