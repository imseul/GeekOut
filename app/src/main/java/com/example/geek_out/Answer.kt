package com.example.geek_out
import android.app.Activity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText

class Answer:Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.answer)

        val submitButton = findViewById<Button>(R.id.submitAnswer)
        val resetButton = findViewById<Button>(R.id.resetAnswer)

        submitButton.setOnClickListener {
            getResponse()
        }

        resetButton.setOnClickListener {
            resetResponse()
        }
    }

    fun getResponse() {
        val answer = findViewById<EditText>(R.id.answerText).text.toString()

        //  Processing response

    }

    fun resetResponse() {
        findViewById<EditText>(R.id.answerText).getText().clear()

        //  Reset response from database

    }
}