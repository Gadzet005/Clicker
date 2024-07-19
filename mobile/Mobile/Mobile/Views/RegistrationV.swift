//
//  RegistrationV.swift
//  Mobile
//
//  Created by Алексей Маренков on 17.07.2024.
//

import SwiftUI

struct RegistrationV: View {
    @State private var email = ""
    @State private var name = ""
    @State private var password = ""
    
    @Binding var isRegistered: Bool
    @Binding var isAuthed: Bool
    
    private let userActs: UserActions = UserActions()
    
    private func registerWrap(name: String, password: String, email: String) -> Void {
        userActs.RegisterA(user: UserM(name: name, password: password, email: email), url: URL(string: SERVER_ADDR + ":" + SERVER_PORT + REGISTER_ROUTER)!) { result in
            switch result {
                case .success(let response):
                if let regResp = response {
                    User = UserM(regResp: regResp, prevUser: User)
                    isRegistered = true
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
                TextField("Name", text: $name)
                    .autocorrectionDisabled()
                    .autocapitalization(.none)
                SecureField("Password", text: $password)
                    .padding()
            }
            .multilineTextAlignment(.center)
            //Spacer()
            
            Button(action: {
                registerWrap(name: name, password: password, email: email)
            }) {
                Text("Зарегистрироваться")
            }.padding()
            
            Button(action: {
                isRegistered = true
            }) {
                Text("Уже зарегестрированны?")
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
    RegistrationV(isRegistered: .constant(false), isAuthed: .constant(false))
}
