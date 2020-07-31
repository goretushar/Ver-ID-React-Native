'use strict';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import ReactNativePluginVerId from '../../src/imports';
import type { VerID } from '../../src/classes/VerID';
import { createButton } from './utils';
import { registerUser, captureLiveFace, deleteRegisteredUser } from '../LiveTests';

type initialState = {
    instance?: VerID;
    USER_ID: string;
};

var styles = StyleSheet.create(require('./component_styles'));

class TestLiveComponent extends Component<{}, initialState> {
    constructor(props: any) {
        super(props);
        this.state = { instance: undefined, USER_ID: 'USER_ID' };
    }

    instanceExist = () => {
        return this.state.instance;
    };

    getInstance = async () => {
        if (!this.instanceExist()) {
            let instance = await ReactNativePluginVerId.load('12');
            this.setState({ instance: undefined });
            return instance;
        } else {
            return this.state.instance;
        }
    };

    registerUser = async () => {
        let instance = await this.getInstance(),
            response;
        if (instance) {
            response = registerUser(instance, this.state.USER_ID);
        }
        return response;
    };

    captureLiveFace = async () => {
        let instance = await this.getInstance(),
            faces;
        if (instance) {
            faces = await captureLiveFace(instance);
        }
        return faces;
    };

    deleteUser = async () => {
        let instance = await this.getInstance();
        if (instance) {
            await deleteRegisteredUser(instance, this.state.USER_ID);
        }
    };

    mapActions = () => {
        let actions: Array<any> = [
            { title: 'register User', action: this.registerUser },
            { title: 'Capture live Face', action: this.captureLiveFace },
            { title: 'Delete User', action: this.deleteUser },
            { title: 'load', action: this.getInstance },
        ];

        return actions;
    };

    render() {
        return (
            <View style={styles.container}>
                {this.mapActions().map((action: any, index: number) => {
                    return createButton(action.title, action.action, index);
                })}
            </View>
        );
    }
}

export default TestLiveComponent;
