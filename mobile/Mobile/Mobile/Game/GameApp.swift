//
//  GameApp.swift
//  Mobile
//
//  Created by Алексей Маренков on 18.07.2024.
//

import Foundation
import SwiftUI

struct GameApp: View {
    @Binding var chs: [String]
    @Binding var colors: [Color]
    
    var worker = WordsA()

    func AddNewWords(words: [String], game: GameM) -> Void {
        //game.nsLock.lock() // что лочится ???
        for word in words {
            game.words.append(word)
        }
        //game.nsLock.unlock()
        if game.noNewWords {
            setNewWord(game: game)
        }
    }
    
    func setNewWord(game: GameM)->Void {
        if game.words.count <= 5 && !game.waitForWords {
            game.waitForWords = true
            worker.GetNewWordsA(request: RequestWordsM(wordAmount: 5, maxWordHardness: 0.5), url: URL(string: SERVER_ADDR + ":" + SERVER_PORT + GETWORDS_ROUTER)!) { words in
                AddNewWords(words: words, game: game)
                game.waitForWords = false
            }
        }
        //game.nsLock.lock()
        if game.words.count == 0 {
            game.noNewWords = true
            return
        }
        game.noNewWords = false
        let word: String = game.words.popFirst()!
        game.wordNow = word
        //game.nsLock.unlock()
        
        var resChArray = Array(repeating: "", count: 20)
        colors = Array(repeating: Color.blue, count: 20)
        game.chIndex = 0
        var ind: Int = chs.count / 2 - word.count / 2
        game.wordStart = ind
        for c in word {
            resChArray[ind] = String(c)
            ind += 1
        }
        chs = resChArray
    }
    
    var body: some View {
        Text("Unexpacted jump to view")
    }
}
