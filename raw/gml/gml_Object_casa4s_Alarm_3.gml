/// gml_Object_casa4s_Alarm_3
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
            ele = ele + -15;
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
            ele = ele + -24;
            action_set_relative(0);
        }
    } else {
        with (r12) {
            action_set_relative(1);
            ele = ele + -11;
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
            ele = ele + -31;
            action_set_relative(0);
        }
    } else {
        with (r12) {
            action_set_relative(1);
            ele = ele + -17;
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
            ele = ele + -42;
            action_set_relative(0);
        }
    } else {
        with (r12) {
            action_set_relative(1);
            ele = ele + -23;
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
            ele = ele + -50;
            action_set_relative(0);
        }
    } else {
        with (r12) {
            action_set_relative(1);
            ele = ele + -33;
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
            ele = ele + -55;
            action_set_relative(0);
        }
    } else {
        with (r12) {
            action_set_relative(1);
            ele = ele + -38;
            action_set_relative(0);
        }
    }
}
action_set_relative(0);
