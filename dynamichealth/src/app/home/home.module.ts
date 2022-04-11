import { HealthKit, HealthKitOptions } from '@ionic-native/health-kit';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  height: number;
  currentHeight = 'No Data';
  stepcount = 'No Data';
  workouts = [];
 
  constructor(private healthKit: HealthKit, private plt: Platform) {
    this.plt.ready().then(() => {
      this.healthKit.available().then(available => {
        if (available) {
          // Request all permissions up front if you like to
          var options: HealthKitOptions = {
            readTypes: ['HKQuantityTypeIdentifierHeight', 'HKQuantityTypeIdentifierStepCount', 'HKWorkoutTypeIdentifier', 'HKQuantityTypeIdentifierActiveEnergyBurned', 'HKQuantityTypeIdentifierDistanceCycling'],
            writeTypes: ['HKQuantityTypeIdentifierHeight', 'HKWorkoutTypeIdentifier', 'HKQuantityTypeIdentifierActiveEnergyBurned', 'HKQuantityTypeIdentifierDistanceCycling']
          }
          this.healthKit.requestAuthorization(options).then(_ => {
            this.loadHealthData();
          })
        }
      });
    });
  }
 
  // Save a new height
  saveHeight() {
    this.healthKit.saveHeight({ unit: 'cm', amount: this.height }).then(_ => {
      this.height = null;
      this.loadHealthData();
    })
  }
 
  // Save a new dummy workout
  saveWorkout() {
    let workout = {
      'activityType': 'HKWorkoutActivityTypeCycling',
      'quantityType': 'HKQuantityTypeIdentifierDistanceCycling',
      'startDate': new Date(), // now
      'endDate': null, // not needed when using duration
      'duration': 6000, //in seconds
      'energy': 400, //
      'energyUnit': 'kcal', // J|cal|kcal
      'distance': 5, // optional
      'distanceUnit': 'km'
    }
    this.healthKit.saveWorkout(workout).then(res => {
      this.loadHealthData();
    })
  }
 
  // Reload all our data
  loadHealthData() {
    this.healthKit.readHeight({ unit: 'cm' }).then(val => {
      this.currentHeight = val.value;
    }, err => {
      console.log('No height: ', err);
    });
 
    var stepOptions = {
      startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      endDate: new Date(),
      sampleType: 'HKQuantityTypeIdentifierStepCount',
      unit: 'count'
    }
 
    this.healthKit.querySampleType(stepOptions).then(data => {
      let stepSum = data.reduce((a, b) => a + b.quantity, 0);
      this.stepcount = stepSum;
    }, err => {
      console.log('No steps: ', err);
    });
 
    this.healthKit.findWorkouts().then(data => {
      this.workouts = data;
    }, err => {
      console.log('no workouts: ', err);
      // Sometimes the result comes in here, very strange.
      this.workouts = err;
    });
 
  }
}