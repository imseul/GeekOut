package com.example.geek_out

import android.os.Bundle
import android.app.Activity
import android.view.View
import android.widget.ImageView
import androidx.core.content.ContextCompat.getSystemService
import android.icu.lang.UCharacter.GraphemeClusterBreak.T



class RollDice: Activity() {
    private var mDiceImageView: ImageView? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.roll_dice)

        mDiceImageView = findViewById<ImageView>(R.id.dice)
    }

    //  picks a random number between 1 and 6, and sets the die ImageView with image of
    //  corrosponding numbered die
    fun rollAndSet() {
        var number = (0..6).shuffled().last()

        when (number) {
            //  die_1, die_2, .. are supposed to be numbered die images
            1 -> mDiceImageView!!.setImageResource(R.drawable.die_1)
            2 -> mDiceImageView!!.setImageResource(R.drawable.die_2)
            3 -> mDiceImageView!!.setImageResource(R.drawable.die_3)
            4 -> mDiceImageView!!.setImageResource(R.drawable.die_4)
            5 -> mDiceImageView!!.setImageResource(R.drawable.die_5)
            else -> mDiceImageView!!.setImageResource(R.drawable.die_6)
        }
    }
}