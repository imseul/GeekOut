package com.example.geek_out
import android.app.Activity
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.TextView

class DiscussResult: Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.discussion)
        val response = intent.getStringExtra("Response")
        val text = findViewById<View>(R.id.discussion) as TextView
        text.setText(response)
        //should implement a list view so that when other players dispute the player's answer,
        //their responses would show up as a list of Passes and Fails

    }

}