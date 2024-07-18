//
//  GameM.swift
//  Mobile
//
//  Created by Алексей Маренков on 18.07.2024.
//

import Foundation
import DequeModule

class GameM {
    var words: Deque<String> = []
    var wordNow: String = ""
    var chIndex: Int = 0
    var wordStart: Int = 0
    var noNewWords: Bool = true
    var waitForWords: Bool = true
    var nsLock: NSLock
    
    init(words: Deque<String>, wordNow: String, chIndex: Int, wordStart: Int, noNewWords: Bool, waitForWords: Bool, nsLock: NSLock) {
        self.words = words
        self.wordNow = wordNow
        self.chIndex = chIndex
        self.wordStart = wordStart
        self.noNewWords = noNewWords
        self.waitForWords = waitForWords
        self.nsLock = nsLock
    }
}
