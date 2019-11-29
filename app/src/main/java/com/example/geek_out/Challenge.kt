package com.example.geek_out

import android.app.Activity
import android.os.Bundle
import android.view.View
import android.widget.EditText
import android.widget.TextView

class Challenge: Activity() {
    var value = 0;
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.challenge)
        var string = ""
        value = intent.getIntExtra("DiceVal", 0)
        if (value != 0) {
            when (value) {
                1 -> string = "Movies"
                2 -> string = "Television"
                3 -> string = "Literature"
                4 -> string = "Music"
                5 -> string = "Miscellaneous"
                else -> {
                    string = "Pick any category!"
                }
            }
        }
        val edit = findViewById<View>(R.id.category) as TextView
        edit.setText("This is the category: "+ string)

        //for each of the challenges, sample questions should be stored in the database, need to wait
        //for the database to be included so we can figure that out
    }
}