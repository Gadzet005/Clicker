//
//  ContentView.swift
//  Mobile
//
//  Created by Алексей Маренков on 16.07.2024.
//

import SwiftUI
import DequeModule

var User: UserM = UserM(name: "", password: "", email: "")
//let env = ProcessInfo.processInfo.environment

let SERVER_ADDR="http://192.168.1.2"
let SERVER_PORT="3005"
let REGISTER_ROUTER="/users/register"
let LOGIN_ROUTER="/users/login"
let LOGOUT_ROUTER="/users/logout"
let GETWORDS_ROUTER="/getWords"
let LADDER_WORDS_ROUTER="/game/getBestUsersByWord"
let LADDER_COINS_ROUTER="/game/getBestUsersByCoin"
let TYPE_ROUTER="/game/type"
let REFRESH_TOKEN_ROUTER="/users/refreshtoken"

struct ContentView: View {
    //@AppStorage("User") var user: UserM = UserM(name: "", password: "", email: "")
    //@State var User: UserM? = nil
    /*@State var nextWord: String = ""
    @State var chs: [String] = Array(repeating: "", count: 20)
    @State var colors: [Color] = Array(repeating: Color.blue, count: 20)
    @State var text: String = ""
    @State var text2: String = ""
    
    
    //@State var words: [String] = ["aboba", "aa", "a", "adasdas"]
    static var words: Deque<String> = ["aboba", "aa", "a", "adasdas"]
    @State var wordIndex: Int = 0
    @State var chIndex: Int = 0
    @State var wordStart: Int = 0*/
    
    /*static var stateLock = NSLock()
    
    static let AddNewWords: (([String]) -> Void) = { words in
        Self.stateLock.lock()
        for word in words {
            Self.words.append(word)
        }
        Self.stateLock.unlock()
    }

    let wordsA = WordsA.init(onGetWords: AddNewWords)
    
    func setNewWord() {
        Self.stateLock.lock()
        if Self.words.count == 0 {
            ///GetNewWordsAwaitA(100, 0.5)
            /*for word in GetNewWordsA(100, 0.5) {
                words.pushLast(word)
            }*/
        }
        let word: String = Self.words.popFirst()!
        Self.stateLock.unlock()
        chs = Array(repeating: "", count: 20)
        colors = Array(repeating: Color.blue, count: 20)
        chIndex = 0
        var ind: Int = chs.count / 2 - word.count / 2
        wordStart = ind
        for c in word {
            chs[ind] = String(c)
            ind += 1
        }
    }*/


    @State var chs: [String] = Array(repeating: "", count: 20)
    @State var colors: [Color] = Array(repeating: Color.blue, count: 20)
    @State var coinCount: Float64 = 0
    @State var wordCount: Int64 = 0
    
    @State var isRegistered: Bool = false
    @State var isAuthed: Bool = false
    @State var currentPage: String = "Game"
    
    var body: some View {
        HStack {
            if !isAuthed {
                if !isRegistered {
                    RegistrationV(isRegistered: $isRegistered, isAuthed: $isAuthed)
                } else {
                    LoginV(isRegistered: $isRegistered, isAuthed: $isAuthed)
                }
            } else {
                if currentPage == "Ladder" {
                    LadderV(currentPage: $currentPage)
                } else {
                    GameV(chs: $chs, colors: $colors, coinCount: $coinCount, wordCount: $wordCount, currentPage: $currentPage, app: GameApp(chs: $chs, colors: $colors, coinCount: $coinCount, wordCount: $wordCount))
                    //GameV(currentPage: $currentPage, chs: $chs)
                }
            }
        }
        /*VStack {
            //Button("register", systemImage: "globe", action: registerWrap)
            //Button("login", systemImage: "globe", action: loginWrap)
            ZStack {
                TextField("", text: $text)
                    .disableAutocorrection(
                        true
                    ).frame(
                        minWidth: UIScreen.main.bounds.size.width,
                        minHeight: 500
                    ).font(
                        .system(
                            size: 200
                        )
                    ).foregroundColor(
                        .black.opacity(
                            0
                        )
                    ).textCase(.lowercase)
                    .onChange(of: text) { oldState, newState in
                        let word = Self.words[wordIndex]
                        for ch in newState {
                            if ch.lowercased() == word[word.index(word.startIndex, offsetBy: chIndex)].lowercased() {
                                colors[wordStart + chIndex] = Color.green
                            } else {
                                colors[wordStart + chIndex] = Color.red
                            }
                            chIndex += 1
                            if chIndex == word.count {
                                setNewWord()
                            }
                        }
                        text = ""
                    }
                
                HStack(spacing: 0) {
                    ForEach(0..<Int(chs.count)) { index in
                        Text(chs[index]).foregroundColor(colors[index])
                    }
                }.font(.title)
                
            }
            .task({setNewWord()})
        }*/
    }
}

#Preview {
    ContentView()
}
