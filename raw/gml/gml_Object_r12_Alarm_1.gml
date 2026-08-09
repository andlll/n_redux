/// gml_Object_r12_Alarm_1
// locals: __b__
action_set_alarm(300, 1);
__b__ = action_if_variable(ondan, 0, 2);
if (!__b__) {
    action_create_object(monvo, -170, irandom_range(380, 3120));
    __b__ = action_if_dice(10);
    if (__b__) {
        action_create_object(mongo, -170, irandom_range(380, 3120));
    }
    __b__ = action_if_dice(13);
    if (__b__) {
        action_create_object(monbo, -170, irandom_range(380, 3120));
    }
    with (chies) {
        __b__ = action_if_variable(level, 3, 4);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_create_object(monvo, -170, irandom_range(380, 3120));
        }
    }
    with (chies) {
        __b__ = action_if_variable(level, 2, 4);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        __b__ = action_if_number(160, 0, 0);
        if (__b__) {
            __b__ = action_if_dice(18);
            if (__b__) {
                action_create_object(monviolo, -170, irandom_range(380, 3120));
            }
        }
    }
    with (chies) {
        __b__ = action_if_variable(level, 2, 4);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        __b__ = action_if_dice(15);
        if (__b__) {
            action_create_object(monvo_giga, -170, irandom_range(380, 3120));
        }
    }
    __b__ = action_if_variable(spy, 1, 0);
    if (__b__) {
        __b__ = action_if_variable(hap, pop, 4);
        if (__b__) {
            with (chies) {
                __b__ = action_if_variable(level, 3, 1);
                if (__b__) {
                    break;
                }
            }
            if (__b__) {
                __b__ = action_if_dice(17);
                if (__b__) {
                    __b__ = action_if_number(162, 0, 0);
                    if (__b__) {
                        action_create_object(monspi, -170, irandom_range(380, 1620));
                    } else {
                        action_create_object(monspi, -170, irandom_range(380, 3220));
                    }
                }
            }
            with (chies) {
                __b__ = action_if_variable(level, 3, 0);
                if (__b__) {
                    break;
                }
            }
            if (__b__) {
                __b__ = action_if_dice(17);
                if (__b__) {
                    __b__ = action_if_number(162, 0, 0);
                    if (__b__) {
                        action_create_object(recogn, -170, irandom_range(380, 1620));
                    } else {
                        action_create_object(recogn, -170, irandom_range(380, 3220));
                    }
                }
            }
        } else {
            with (chies) {
                __b__ = action_if_variable(level, 3, 1);
                if (__b__) {
                    break;
                }
            }
            if (__b__) {
                __b__ = action_if_dice(2);
                if (__b__) {
                    __b__ = action_if_number(162, 0, 0);
                    if (__b__) {
                        action_create_object(monspi, -170, irandom_range(380, 1620));
                    } else {
                        action_create_object(monspi, -170, irandom_range(380, 3220));
                    }
                }
            }
            with (chies) {
                __b__ = action_if_variable(level, 3, 0);
                if (__b__) {
                    break;
                }
            }
            if (__b__) {
                __b__ = action_if_dice(2);
                if (__b__) {
                    __b__ = action_if_number(162, 0, 0);
                    if (__b__) {
                        action_create_object(recogn, -170, irandom_range(380, 1620));
                    } else {
                        action_create_object(recogn, -170, irandom_range(380, 3220));
                    }
                }
            }
        }
    }
}
