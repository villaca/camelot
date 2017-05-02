/**
 * Created by danie on 22/12/2016.
 */


'use strict';

angular
    .module('myApp.factories')
    .factory('ReadableProcess', function () {

        ReadableProcess.prototype.addTask = function (newTask) {
            let index = this.tasks.indexOf(newTask);

            if (index == -1) {
                this.tasks.push(newTask);

                for (let actor of newTask.getAllActor()) {
                    this.addActor(actor);
                }
            }
        };

        ReadableProcess.prototype.getTasks = function () {
            return this.tasks;
        };

        ReadableProcess.prototype.getTask = function (index) {
            return this.tasks[index];
        };

        ReadableProcess.prototype.getDisabledTasks = function () {
            return this.disabledTasks;
        };

        ReadableProcess.prototype.getDisabledTask = function (index) {
            return this.disabledTasks[index];
        };

        ReadableProcess.prototype.getActors = function () {
            return this.actors;
        };

        ReadableProcess.prototype.getActor = function (index) {
            return this.actors[index];
        };

        ReadableProcess.prototype.deleteTask = function (readableTask) {
            let index = this.tasks.indexOf(readableTask);

            if (index > -1) {
                this.disabledTasks.push(this.tasks[index]);
                this.tasks.splice(index, 1);
            }
        };

        ReadableProcess.prototype.deleteActor = function (actor) {
            let tasksToBeDeleted = this.getTasksByActor(actor);
            let index = this.actors.indexOf(actor);

            for(let task of tasksToBeDeleted){
                this.deleteTask(task);
            }

            this.disabledActors.push(this.actors[index]);
            this.actors.splice(index, 1);

        };

        ReadableProcess.prototype.addActor = function (newActor) {
            let index = this.actors.indexOf(newActor);

            if (index == -1) {
                this.actors.push(newActor);
            }
        };

        ReadableProcess.prototype.getTasksByActor = function (actor) {
            let tasks = [];

            for(let task of this.tasks){
                let taskActors = task.getAllActor();

                if ((actor == "none") && (taskActors.length == 0)) {
                    tasks.push(task);
                }
                else {
                    let actorIndex = taskActors.indexOf(actor);

                    if (actorIndex != -1) {
                        tasks.push(task);
                    }
                }
            }

            return tasks;
        };


        ReadableProcess.prototype.draw = function (context) {
            var coordinateX = 0;
            var coordinateY = 0;
            var actorWidth = 100;
            var actorHeight = 20;
            var taskWidth = 100;
            var taskHeight = 100;
            var commentWidth = 100;
            var commentHeight = 50;

            var spaceBetweenBoxes = 40;

            var taskIndex = 0;

            for(let task of this.tasks){
                taskIndex++;
                let actor = task.getActor(0);
                if((actor == null) || (actor == "")){
                    actor = "No actors!";
                }
                let comment = task.getComment(0);

                context.strokeRect(coordinateX, coordinateY, actorWidth, actorHeight);
                context.fillText(actor, coordinateX + 30, coordinateY + 13);

                coordinateY += actorHeight + spaceBetweenBoxes;

                context.beginPath();
                context.moveTo(coordinateX + actorWidth/2, coordinateY - spaceBetweenBoxes);
                context.lineTo(coordinateX + actorWidth/2, coordinateY);
                context.stroke();
                context.closePath();

                context.strokeRect(coordinateX, coordinateY, taskWidth, taskHeight);
                context.fillText(task.getDefinition(), coordinateX + 10, coordinateY + 40);

                if(taskIndex != this.tasks.length){
                    context.beginPath();
                    context.moveTo(coordinateX + taskWidth, coordinateY + taskHeight/2);
                    context.lineTo(coordinateX + taskWidth + 20, coordinateY + taskHeight/2);
                    context.lineTo(coordinateX + taskWidth + 15, coordinateY + taskHeight/2 - 5);
                    context.moveTo(coordinateX + taskWidth + 20, coordinateY + taskHeight/2);
                    context.lineTo(coordinateX + taskWidth + 15, coordinateY + taskHeight/2 + 5);
                    context.stroke();
                    context.closePath();
                }


                if((comment != null) && (comment != "")){
                    coordinateY += taskHeight + spaceBetweenBoxes;

                    context.beginPath();
                    context.moveTo(coordinateX + actorWidth/2, coordinateY - spaceBetweenBoxes);
                    context.lineTo(coordinateX + actorWidth/2, coordinateY);
                    context.stroke();
                    context.closePath();

                    context.strokeRect(coordinateX, coordinateY, commentWidth, commentHeight);
                    context.fillText(comment, coordinateX + 10, coordinateY + 15);
                }

                coordinateY = 0;
                coordinateX += 120
            }

        }

        function ReadableProcess() {
            this.tasks = [];
            this.disabledTasks = [];
            this.actors = [];
            this.disabledActors = [];
        }

        return ReadableProcess;
});
