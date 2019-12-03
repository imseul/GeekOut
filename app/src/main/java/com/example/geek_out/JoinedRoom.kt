package com.example.geek_out

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.TextView

class JoinedRoom : Activity(){
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.joined_room)
        val button = findViewById<View>(R.id.startGame) as Button
        button.setOnClickListener {
            startGame()
        }
        val roomId = intent!!.getStringExtra("Room")
        var text = findViewById<View>(R.id.RoomID) as TextView
        if (!roomId.equals("")) {
            text.setText("Session id is: " + roomId.toString())
        }
//need to show players entering the room
    }
    fun startGame() {
        //if current user is picked as the starting point
        val intent = Intent(this, RollDice::class.java)
        startActivity(intent)
    }

}