//
//  UserM.swift
//  Mobile
//
//  Created by Алексей Маренков on 16.07.2024.
//

import Foundation

/// what for I nee password there? it's not safe
final class UserM: Encodable { //RawRepresentable, Decodable
    var name: String
    var password: String
    var email: String
    var id: Int64?
    var accessToken: String?
    var refreshToken: String?
    
    /*typealias RawValue = String
    required init(rawValue: RawValue) {
        let decoder: JSONDecoder = JSONDecoder()
        let decoded = decoder.decode(UserM, from: Data(rawValue))
        self.name = name
        self.password = password
        self.email = email
        self.id = id
        self.accessToken = accessToken
        self.refreshToken = refreshToken
    }

    var rawValue: RawValue { "\(someValue)" }*/
    
    init(name: String, password: String, email: String, id: Int64? = nil, accessToken: String? = nil, refreshToken: String? = nil) {
        self.name = name
        self.password = password
        self.email = email
        self.id = id
        self.accessToken = accessToken
        self.refreshToken = refreshToken
    }
    
    init(regResp: ResponseUserTockenM, prevUser: UserM) {
        self.email = regResp.user.email
        self.name = regResp.user.name
        self.id = regResp.user.id
        self.password = prevUser.password
        self.accessToken = regResp.accessToken
        self.refreshToken = nil
    }
    
    /*init(register: RegisterM, accessToken: String? = nil, refreshToken: String? = nil) {
        self.name = register.name
        self.password = register.password
        self.email = register.email
        self.accessToken = accessToken
        self.refreshToken = refreshToken
    }*/
}

/*final class LoginM: Codable {
    var password: String
    var email: String
    init(user: UserM) {
        self.password = user.password
        self.email = user.email
    }
    init(password: String, email: String) {
        self.password = password
        self.email = email
    }
}

final class RegisterM : Codable {
    var name: String = "123"
    var password: String = "123"
    var email: String = "132"
    init(user: UserM) {
        self.name = user.name
        self.password = user.password
        self.email = user.email
    }
    init(name: String, password: String, email: String) {
        self.name = name
        self.password = password
        self.email = email
    }
}*/

/*class ProfileM: UserM {
    
}*/
