import {NgModule }from '@angular/core';
import {IonicPageModule }from 'ionic-angular';
import {OtpValidationPage }from './otp-validation';
import {AlertProvider }from '../../providers/alert/alert';
import {LoadingProvider }from '../../providers/loading/loading';

@NgModule( {
declarations:[
    OtpValidationPage,
],
imports:[
    IonicPageModule.forChild(OtpValidationPage),
], providers:[
AlertProvider, LoadingProvider,
]
})
export class OtpValidationPageModule {}
