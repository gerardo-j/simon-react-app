import React, { useState } from 'react';
import useKey from './UseKey';
import $ from 'jquery';
import './SimonStyles.css'
import blueSound from "./sounds/blue.mp3";
import greenSound from "./sounds/green.mp3";
import redSound from "./sounds/red.mp3";
import wrongSound from "./sounds/wrong.mp3";
import yellowSound from "./sounds/yellow.mp3";

let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

function SimonApp() {
    const [title, setTitle] = useState("Press A Key to Start")
    useKey("KeyA", startSequence, level);


    function startSequence() {
        userClickedPattern = []
        level++;
        setTitle("Level " + level);
        let randomNumber = Math.floor(Math.random() * 4);
        let randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor)
        playSound(randomChosenColor);
        $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    }    
    
    function handleClick(event) {
        const color = event.target.id;
        userClickedPattern.push(color);
        console.log(userClickedPattern);
        playSound(color);
        animatePress(color);
        checkAnswer(userClickedPattern.length - 1);
    }
    
    function checkAnswer(currentLevel) {
        if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
            if(userClickedPattern.length === gamePattern.length) {
                setTimeout(() => {
                    nextSequence();
                }, 1000);
            }
        } else {
            startOver();
        }
    }

    function nextSequence() {
        userClickedPattern = []
        level++;
        setTitle("Level " + level);
        let randomNumber = Math.floor(Math.random() * 4);
        let randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor)
        $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
        playSound(randomChosenColor);
    }

    function startOver() {
        playSound("wrong");
        $(".simon-app-body").addClass("simon-game-over");
        setTimeout(() => {
            $(".simon-app-body").removeClass("simon-game-over");
        }, 100)
        setTitle("Game Over, Press A to restart")
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
    }
    
    function playSound(name) {
        var audio;
        switch (name) {
            case 'blue':
                audio = new Audio(blueSound);
                break;
            case 'green':
                audio = new Audio(greenSound);
                break;
            case 'yellow':
                audio = new Audio(yellowSound);
                break;
            case 'red':
                audio = new Audio(redSound);
                break;
            case 'wrong':
                audio = new Audio(wrongSound);
                break;
            default:
                break;
        }
        audio.play();
    }
    
    function animatePress(currentColor) {
        $(".simon-" + currentColor).addClass("simon-pressed");
        setTimeout(() => {
            $(".simon-" + currentColor).removeClass("simon-pressed")
        }, 100)
    }

    return (
        <div className="simon-app-body">
            <h1 id="simon-level-title">{title}</h1>
            <div className="container">
                <div className="row">
                    <div type="button" onClick={handleClick} id="green" className="simon-btn simon-green"></div>
                    <div type="button" onClick={handleClick} id="red" className="simon-btn simon-red"></div>
                </div>

                <div className="row">
                    <div type="button" onClick={handleClick} id="yellow" className="simon-btn simon-yellow"></div>
                    <div type="button" onClick={handleClick} id="blue" className="simon-btn simon-blue"></div>
                </div>

            </div>
        </div>
    )
}

export default SimonApp;