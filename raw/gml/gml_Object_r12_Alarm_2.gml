/// gml_Object_r12_Alarm_2
// locals: __b__
action_set_relative(1);
__b__ = action_if_number(736, 0, 0);
if (__b__) {
    __b__ = action_if_variable(wewe, 100, 3);
    if (__b__) {
        oil = oil + -2;
    }
    __b__ = action_if_variable(wewe, 200, 3);
    if (__b__) {
        oil = oil + -3;
    }
    __b__ = action_if_variable(wewe, 200, 2);
    if (__b__) {
        __b__ = action_if_variable(wewe, 300, 3);
        if (__b__) {
            oil = oil + -5;
        }
    }
    __b__ = action_if_variable(wewe, 300, 2);
    if (__b__) {
        __b__ = action_if_variable(wewe, 400, 3);
        if (__b__) {
            oil = oil + -7;
        }
    }
    __b__ = action_if_variable(wewe, 400, 2);
    if (__b__) {
        __b__ = action_if_variable(wewe, 500, 3);
        if (__b__) {
            oil = oil + -9;
        }
    }
    __b__ = action_if_variable(wewe, 500, 2);
    if (__b__) {
        __b__ = action_if_variable(wewe, 700, 3);
        if (__b__) {
            oil = oil + -12;
        }
    }
    __b__ = action_if_variable(wewe, 700, 2);
    if (__b__) {
        __b__ = action_if_variable(wewe, 1000, 3);
        if (__b__) {
            oil = oil + -15;
        }
    }
    __b__ = action_if_variable(wewe, 1000, 2);
    if (__b__) {
        __b__ = action_if_variable(wewe, 1500, 3);
        if (__b__) {
            oil = oil + -23;
        }
    }
    __b__ = action_if_variable(wewe, 1500, 2);
    if (__b__) {
        __b__ = action_if_variable(wewe, 2000, 3);
        if (__b__) {
            oil = oil + -30;
        }
    }
    __b__ = action_if_variable(wewe, 2000, 2);
    if (__b__) {
        __b__ = action_if_variable(wewe, 3000, 3);
        if (__b__) {
            oil = oil + -50;
        }
    }
    __b__ = action_if_variable(wewe, 3000, 2);
    if (__b__) {
        oil = oil + -80;
    }
}
__b__ = action_if_variable(storm, 0, 0);
if (__b__) {
    __b__ = action_if_number(730, 0, 0);
    if (__b__) {
        __b__ = action_if_number(736, 0, 0);
        if (__b__) {
            __b__ = action_if_dice(800);
            if (__b__) {
                action_set_relative(0);
                storm = 1;
                action_set_relative(1);
                action_set_relative(0);
                action_create_object(tincom, 960, 300);
                action_set_relative(1);
                action_set_relative(0);
                action_create_object(thunderclap, 0, 0);
                action_set_relative(1);
                action_set_relative(0);
                action_create_object(rainlauncher, 600, 0);
                action_set_relative(1);
                __b__ = action_if_dice(2);
                if (__b__) {
                    action_set_relative(0);
                    action_set_alarm(1800, 7);
                    action_set_relative(1);
                } else {
                    action_set_relative(0);
                    action_set_alarm(2100, 7);
                    action_set_relative(1);
                }
            }
        }
    }
}
__b__ = action_if_number(736, 0, 2);
if (__b__) {
    __b__ = action_if_variable(stormeasy, 0, 0);
    if (__b__) {
        __b__ = action_if_dice(450);
        if (__b__) {
            action_set_relative(0);
            stormeasy = 1;
            action_set_relative(1);
            action_set_relative(0);
            action_create_object(rainlauncher, 600, 0);
            action_set_relative(1);
            __b__ = action_if_dice(2);
            if (__b__) {
                action_set_relative(0);
                action_set_alarm(1800, 9);
                action_set_relative(1);
            } else {
                action_set_relative(0);
                action_set_alarm(2100, 9);
                action_set_relative(1);
            }
        }
    }
}
action_set_relative(0);
action_set_alarm(60, 2);
action_set_relative(1);
action_set_relative(0);
