package com.example.geek_out

import android.app.Activity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText

class Bidding : Activity(){
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.bidding)

        val confirmButton = findViewById<Button>(R.id.confirm)
        val resetButton = findViewById<Button>(R.id.reset)
        confirmButton.setOnClickListener {
            getBid()
        }
        resetButton.setOnClickListener {
            resetBid()
        }
    }

    fun getBid() {
        val bid = findViewById<EditText>(R.id.enterBid).text.toString()
        //Need to store the bid in the database for the user
        //  Bidding

    }

    fun resetBid() {
        findViewById<EditText>(R.id.enterBid).getText().clear()

        //  Reset bid

    }
}
