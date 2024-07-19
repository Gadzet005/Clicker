//
//  Actions.swift
//  Mobile
//
//  Created by Алексей Маренков on 19.07.2024.
//

import Foundation

struct PlayerWordsM: Codable {
    var id: Int64
    var name: String
    var wordCount: Int64
}

struct PlayerCoinsM: Codable {
    var id: Int64
    var name: String
    var coinCount: Float64
}

struct ResponseLadderWordsM: Decodable {
    var users: [PlayerWordsM]
}

struct ResponseLadderCoinsM: Decodable {
    var users: [PlayerCoinsM]
}

struct LadderA {
    private let netWorker = Worker()

    func GetLadderProfilesWordsA(url: URL, onResponse: @escaping  ([PlayerWordsM])->Void) {
        let LadderWordsCompletion: ((Result<ResponseLadderWordsM?, Error>) -> Void)? = { result in
            switch result {
                case .success(let response):
                if let data = response {
                    onResponse(data.users)
                } else {
                    print("Got unexpected data")
                }
                case .failure(let error):
                    print(error)
             }
        }
        
        netWorker.fetch(preRequest: PreURLRequest<String>(url: url, httpMethod: "GET", body: ""), completion: LadderWordsCompletion)
    }
    
    func GetLadderProfilesCoinsA(url: URL, onResponse: @escaping  ([PlayerCoinsM])->Void) {
        let LadderCoinsCompletion: ((Result<ResponseLadderCoinsM?, Error>) -> Void)? = { result in
            switch result {
                case .success(let response):
                if let data = response {
                    onResponse(data.users)
                } else {
                    print("Got unexpected data")
                }
                case .failure(let error):
                    print(error)
             }
        }
        
        netWorker.fetch(preRequest: PreURLRequest<String>(url: url, httpMethod: "GET", body: ""), completion: LadderCoinsCompletion)
    }
}
