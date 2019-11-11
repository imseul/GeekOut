package com.example.geek_out

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val joinButton = findViewById<Button>(R.id.joinRoom)
        val createButton = findViewById<Button>(R.id.createRoom)

        joinButton.setOnClickListener {
            joinRoom()
        }

        createButton.setOnClickListener {
            createRoom()
        }
    }

    fun joinRoom() {
        val roomID = findViewById<EditText>(R.id.enterRoom).text.toString()

        //  Joining room

    }

    fun createRoom() {
        val roomID = findViewById<EditText>(R.id.enterRoom).text.toString()

        //  Creating Room

    }
}
