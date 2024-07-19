//
//  LadderV.swift
//  Mobile
//
//  Created by Алексей Маренков on 17.07.2024.
//

import SwiftUI

struct LadderV: View {
    @Binding var currentPage: String
    @State var playersCoins: [PlayerCoinsM] = []
    @State var playersWords: [PlayerWordsM] = []
    @State var playersLadder: [ProfileM] = []
    @State var show: String = "Coins"
    @State private var isPressedCoin = false
    @State private var isPressedWord = false
    var worker = LadderA()
    
    private func AddProfileWords(profiles: [PlayerWordsM]) {
        playersWords = profiles
        var newLadder = Array(repeating: ProfileM(id: 0, name: "", amount: ""), count: profiles.count)
        for i in 0..<profiles.count {
            newLadder[i] = ProfileM(id: 0, name: profiles[i].name, amount: String(profiles[i].wordCount))
        }
        playersLadder = newLadder
    }
    
    private func AddProfileCoins(profiles: [PlayerCoinsM]) {
        playersCoins = profiles
        var newLadder = Array(repeating: ProfileM(id: 0, name: "", amount: ""), count: profiles.count)
        for i in 0..<profiles.count {
            newLadder[i] = ProfileM(id: 0, name: profiles[i].name, amount: String(profiles[i].coinCount))
        }
        playersLadder = newLadder
    }
    
    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack {
                Spacer()
                Button(action: {currentPage="Game"}, label: {
                    Text("Игра")
                        .font(.title2)
                })
                Spacer()
            }
            .cornerRadius(30)
            .padding(12)
            
            VStack {
                HStack {
                    Spacer()
                    Text("Рейтинг игроков")
                        .font(.title)
                        .bold()
                        .padding(.horizontal, 20)
                    Spacer()
                }
                HStack {
                    Spacer()
                    Button(action: {
                        withAnimation {
                            isPressedCoin.toggle()
                        }
                        show = "Coins"
                    }) {
                        Image(systemName: "bitcoinsign.circle.fill")
                            .resizable()
                            .frame(width: 24, height: 24)
                            .padding(12)
                            .cornerRadius(30)
                            .shadow(radius: 10)
                    }
                    Button(action: {
                        withAnimation {
                            isPressedCoin.toggle()
                        }
                        show = "Words"
                    }) {
                        Image(systemName: "character.bubble.fill")
                            .resizable()
                            .frame(width: 24, height: 24)
                            .padding(12)
                            .cornerRadius(30)
                            .shadow(radius: 10)
                    }
                    Spacer()
                }
            }
            ScrollView(.vertical, showsIndicators: false) {
                VStack {
                    if show == "Coins" {
                        ForEach(0..<playersCoins.count, id: \.self) { i in
                            //Button(action: {}, label: {
                            HStack {
                                Text(playersCoins[i].name).font(.title2)
                                Spacer()
                                Text(String(format: "%.2f", playersCoins[i].coinCount)).font(.title2)
                            }
                            //}).padding(.top, 6).padding(.bottom, 40)
                        }
                    } else {
                        ForEach(0..<playersWords.count, id: \.self) { i in
                            //Button(action: {}, label: {
                            HStack {
                                Text(playersWords[i].name).font(.title2)
                                Spacer()
                                Text(String(playersWords[i].wordCount)).font(.title2)
                            }
                            //}).padding(.top, 6).padding(.bottom, 40)
                        }
                    }
                    }
                }.padding(.horizontal, 20)
        }.task {
            self.worker.GetLadderProfilesWordsA(url: URL(string: SERVER_ADDR + ":" + SERVER_PORT + LADDER_WORDS_ROUTER)!) { profiles in
                    AddProfileWords(profiles: profiles)
            }
            
            self.worker.GetLadderProfilesCoinsA(url: URL(string: SERVER_ADDR + ":" + SERVER_PORT + LADDER_COINS_ROUTER)!) { profiles in
                    AddProfileCoins(profiles: profiles)
            }
        }
    }
}


#Preview {
    LadderV(currentPage: .constant("Ladder"))
}
