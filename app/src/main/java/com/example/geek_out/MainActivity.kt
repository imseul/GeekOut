package com.example.geek_out

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.content.Intent

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
        if (!roomID.equals("")) { //make sure that text is not empty
            val intent = Intent(this, JoinedRoom::class.java).putExtra("Room", "");
            startActivity(intent);
        }
        //  Joining room

    }

    fun createRoom() {
        val roomID = findViewById<EditText>(R.id.enterRoom).text.toString()
        if (!roomID.equals("")) { //make sure the id is not already existing
            val intent = Intent(this, JoinedRoom::class.java).putExtra("Room", roomID)
            startActivity(intent);
        }
        //  Creating Room with the id

    }
}
