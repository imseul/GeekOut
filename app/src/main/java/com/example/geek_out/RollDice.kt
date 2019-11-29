package com.example.geek_out

import android.os.Bundle
import android.app.Activity
import android.view.View
import android.widget.ImageView
import android.content.Intent
import androidx.core.content.ContextCompat.getSystemService
import android.icu.lang.UCharacter.GraphemeClusterBreak.T
import android.widget.Toast


class RollDice : Activity() {
    var count = 0;
    private var mDiceImageView: ImageView? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.roll_dice)
        mDiceImageView = findViewById<ImageView>(R.id.dice)

        mDiceImageView!!.setOnClickListener { view ->
            rollAndSet()
        }

    }

    //  picks a random number between 1 and 6, and sets the die ImageView with image of
    //  corrosponding numbered die
    fun rollAndSet() {
        var number = (0..6).shuffled().last()

        when (number) {
            //  die_1, die_2, .. are supposed to be numbered die images
            1 -> mDiceImageView!!.setImageResource(R.mipmap.die_1_foreground)
            2 -> mDiceImageView!!.setImageResource(R.mipmap.die_2_foreground)
            3 -> mDiceImageView!!.setImageResource(R.mipmap.die_3_foreground)
            4 -> mDiceImageView!!.setImageResource(R.mipmap.die_4_foreground)
            5 -> mDiceImageView!!.setImageResource(R.mipmap.die_5_foreground)
            else -> mDiceImageView!!.setImageResource(R.mipmap.die_6_foreground)
        }
        Toast.makeText(applicationContext, "You rolled a " + number + "!",Toast.LENGTH_LONG).show()
        Thread.sleep(100)
        val intent = Intent(this, Challenge::class.java).putExtra("DiceVal", number)
        startActivity(intent)
    }
}