//
//  Actions.swift
//  Mobile
//
//  Created by Алексей Маренков on 16.07.2024.
//

import Foundation

struct ResponseWordsM: Decodable {
    var words: [String]
}

struct RequestWordsM: Encodable {
    var wordAmount: Int
    var maxWordHardness: Float64
}

struct ResponseCommitLetterM: Decodable {
    var moneyChanging: Int64
    var coinCount: Float64
    var wordCount: Int64
}

struct RequestCommitLetterM: Encodable {
    var success: Bool
    var completeWord: Bool
}

struct GameA {
    private let netWorker = Worker()

    func GetNewWordsA(request: RequestWordsM, url: URL, onResponse: @escaping  ([String])->Void) {
        let wordGetCompletion: ((Result<ResponseWordsM?, Error>) -> Void)? = { resp in
            switch resp {
                case .success(let data):
                if let wordResp = data {
                    onResponse(wordResp.words)
                } else {
                    print("Got unexpected data")
                }
                case .failure(let error):
                    print(error)
             }
        }
        
        netWorker.fetch(preRequest: PreURLRequest<String>(url: url, httpMethod: "GET", body: "", queries: ["wordAmount": String(request.wordAmount), "maxWordHardness": String(request.maxWordHardness)]), completion: wordGetCompletion)
    }
    
    func CommitLetterA(request: RequestCommitLetterM, url: URL, onResponse: @escaping  (Int64, Float64, Int64)->Void) {
        let CommitLetterCompletion: ((Result<ResponseCommitLetterM?, Error>) -> Void)? = { result in
            switch result {
                case .success(let response):
                if let data = response {
                    onResponse(data.moneyChanging, data.coinCount, data.wordCount)
                } else {
                    print("Got unexpected data")
                }
                case .failure(let error):
                    print(error)
             }
        }
        
        netWorker.fetch(preRequest: PreURLRequest<RequestCommitLetterM>(url: url, httpMethod: "POST", body: request), completion: CommitLetterCompletion)
    }
    
    /*func GetNewWordsAwaitA(request: RequestWordsM, url: URL) async -> Bool {
        var resp: ResponseWordsM? = await netWorker.fetchAwait(preRequest: PreURLRequest(url: url, httpMethod: "POST", body: request))
        guard let words = resp
        else {
            return false
        }
        
        onGetWords(words.words)
        
        return true
    }*/
}
