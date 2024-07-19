//
//  GameV.swift
//  Mobile
//
//  Created by Алексей Маренков on 17.07.2024.
//

import SwiftUI
import DequeModule

struct GameV: View {
    @Binding var chs: [String]
    @Binding var colors: [Color]
    @State var text: String = ""
    @Binding var coinCount: Float64
    @Binding var wordCount: Int64
    @Binding var currentPage: String
    
    private let game = GameM(words: [], wordNow: "", chIndex: 0, wordStart: 0, noNewWords: true, waitForWords: false, nsLock: NSLock())
    
    var app: GameApp
    
    var body: some View {
        VStack {
            Button(action: {currentPage="Ladder"}, label: {
                Text("Рейтинг")
                    .font(.title2)
            })
            Text(String(format: "Счёт: %.2f", coinCount))
                .padding(20)
                .font(.title)
            Text("Слов напечатано: \(wordCount)")
                .font(.title)
                //.border(.gray)
                //.background(Color(UIColor( red: CGFloat(255/255.0), green: CGFloat(255/255.0), blue: CGFloat(169/255.0), alpha: CGFloat(0.5))))
            Spacer()
            ZStack {
                TextField("", text: $text)
                    .disableAutocorrection(
                        true
                    )
                    .frame(
                        minWidth: UIScreen.main.bounds.size.width,
                        maxWidth: .infinity,
                        minHeight: 500,
                        maxHeight: 500
                    )
                    .font(
                        .system(
                            size: 200
                        )
                    )
                    .foregroundColor(
                        .black.opacity(
                            0
                        )
                    )
                    .textCase(.lowercase)
                    .onChange(of: text) { oldState, newState in
                        let word = game.wordNow
                        if game.chIndex >= word.count {
                            return
                        }
                        for ch in newState {
                            var success = true
                            if ch.lowercased() == word[word.index(word.startIndex, offsetBy: game.chIndex)].lowercased() {
                                colors[game.wordStart + game.chIndex] = Color.green
                            } else {
                                colors[game.wordStart + game.chIndex] = Color.red
                                success = false
                            }
                            app.CommitLetter(success: success, completeWord: game.chIndex + 1 == word.count, onMoneyChange: {_ in })

                            game.chIndex += 1
                            if game.chIndex == word.count {
                                app.setNewWord(game: game)
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
            Spacer()
        }
        .task {
            app.setNewWord(game: game)
        }
    }
}

/*
#Preview {
    
    GameV(currentPage: .constant("Game"), chs: .constant( Array(repeating: "", count: 20)), colors: Array(repeating: Color.blue, count: 20), app: GameApp(chs: <#T##Binding<[String]>#>, colors: <#T##Binding<[Color]>#>))
}
*/
