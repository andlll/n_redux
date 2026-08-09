/// gml_Object_casa3_Alarm_3
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
            ele = ele + -7;
            action_set_relative(0);
        }
    } else {
        with (r12) {
            action_set_relative(1);
            ele = ele + -3;
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
            ele = ele + -11;
            action_set_relative(0);
        }
    } else {
        with (r12) {
            action_set_relative(1);
            ele = ele + -6;
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
            ele = ele + -15;
            action_set_relative(0);
        }
    } else {
        with (r12) {
            action_set_relative(1);
            ele = ele + -9;
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
            ele = ele + -20;
            action_set_relative(0);
        }
    } else {
        with (r12) {
            action_set_relative(1);
            ele = ele + -12;
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
            ele = ele + -24;
            action_set_relative(0);
        }
    } else {
        with (r12) {
            action_set_relative(1);
            ele = ele + -15;
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
            ele = ele + -27;
            action_set_relative(0);
        }
    } else {
        with (r12) {
            action_set_relative(1);
            ele = ele + -18;
            action_set_relative(0);
        }
    }
}
action_set_relative(0);
