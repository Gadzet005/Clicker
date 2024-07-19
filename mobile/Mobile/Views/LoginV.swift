//
//  LoginV.swift
//  Mobile
//
//  Created by Алексей Маренков on 17.07.2024.
//

import SwiftUI

func CheckIfAuthed() {
    if User.email == "" || User.name == "" || User.accessToken == "" {
        // go to login page
    }
}

struct LoginV: View {
    @Binding var isRegistered: Bool
    @Binding var isAuthed: Bool
    
    /*private func loginWrap() -> Void {
        userActs.RegisterA(user: UserM(name: "FD2343a", password: "232s423212334", email: "1se@hse.ru"), url: URL(string: SERVER_ADDR + ":" + SERVER_PORT + LOGIN_ROUTER)!)
    }*/
    @State private var email = ""
    @State private var password = ""

    private let userActs: UserActions = UserActions()
    
    private func loginWrap(name: String, password: String, email: String) -> Void {
        userActs.LoginA(user: UserM(name: "", password: password, email: email), url: URL(string: SERVER_ADDR + ":" + SERVER_PORT + LOGIN_ROUTER)!) { result in
            switch result {
                case .success(let response):
                if let regResp = response {
                    User = UserM(regResp: regResp, prevUser: User)
                    isAuthed = true
                } else {
                    print("Failed to register user")
                }
                case .failure(let error):
                    print(error)
             }
        }
    }
    

    var body: some View {
        VStack {
            Group {
                TextField("Email", text: $email)
                    .padding()
                    .autocorrectionDisabled()
                    .autocapitalization(.none)
                SecureField("Password", text: $password)
                    .padding()
            }
            .multilineTextAlignment(.center)
            //Spacer()
            
            Button(action: {
                loginWrap(name: "", password: password, email: email)
            }) {
                Text("Войти")
            }.padding()
            
            Button(action: {
                isRegistered = false
            }) {
                Text("Не зарегестрированны?")
            }
        }.task {
            userActs.updateTokens() {
                isRegistered = true
                isAuthed = true
            }
        }
    }
}

#Preview {
    LoginV(isRegistered: .constant(false), isAuthed: .constant(false))
}
