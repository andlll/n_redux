/// gml_Object_casa5ss_Alarm_3
// locals: __b__
action_set_relative(0);
action_set_alarm(120, 3);
__b__ = action_if_variable(ava, 0, 0);
if (__b__) {
    with (aura) {
        __b__ = action_if_variable(night, 1, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        with (r12) {
            action_set_relative(1);
            ele = ele + -29;
            action_set_relative(0);
        }
    } else {
        with (r12) {
            action_set_relative(1);
            ele = ele + -13;
            action_set_relative(0);
        }
    }
}
__b__ = action_if_variable(ava, 1, 0);
if (__b__) {
    with (aura) {
        __b__ = action_if_variable(night, 1, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        with (r12) {
            action_set_relative(1);
            ele = ele + -47;
            action_set_relative(0);
        }
    } else {
        with (r12) {
            action_set_relative(1);
            ele = ele + -20;
            action_set_relative(0);
        }
    }
}
__b__ = action_if_variable(ava, 2, 0);
if (__b__) {
    with (aura) {
        __b__ = action_if_variable(night, 1, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        with (r12) {
            action_set_relative(1);
            ele = ele + -60;
            action_set_relative(0);
        }
    } else {
        with (r12) {
            action_set_relative(1);
            ele = ele + -35;
            action_set_relative(0);
        }
    }
}
__b__ = action_if_variable(ava, 3, 0);
if (__b__) {
    with (aura) {
        __b__ = action_if_variable(night, 1, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        with (r12) {
            action_set_relative(1);
            ele = ele + -81;
            action_set_relative(0);
        }
    } else {
        with (r12) {
            action_set_relative(1);
            ele = ele + -44;
            action_set_relative(0);
        }
    }
}
__b__ = action_if_variable(ava, 4, 0);
if (__b__) {
    with (aura) {
        __b__ = action_if_variable(night, 1, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        with (r12) {
            action_set_relative(1);
            ele = ele + -99;
            action_set_relative(0);
        }
    } else {
        with (r12) {
            action_set_relative(1);
            ele = ele + -65;
            action_set_relative(0);
        }
    }
}
__b__ = action_if_variable(ava, 5, 4);
if (__b__) {
    with (aura) {
        __b__ = action_if_variable(night, 1, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        with (r12) {
            action_set_relative(1);
            ele = ele + -109;
            action_set_relative(0);
        }
    } else {
        with (r12) {
            action_set_relative(1);
            ele = ele + -77;
            action_set_relative(0);
        }
    }
}
action_set_relative(0);
