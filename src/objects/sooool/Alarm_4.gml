/// gml_Object_sooool_Alarm_4
// locals: __b__
action_set_relative(0);
action_set_alarm(30, 4);
with (r12) {
    action_set_relative(1);
    mon = mon + -5;
    action_set_relative(0);
}
with (aura) {
    __b__ = action_if_variable(night, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    with (r12) {
        action_set_relative(1);
        ele = ele + -1;
        action_set_relative(0);
    }
}
with (aura) {
    __b__ = action_if_variable(dawn, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    with (r12) {
        action_set_relative(1);
        ele = ele + 5;
        action_set_relative(0);
    }
}
with (aura) {
    __b__ = action_if_variable(night, 0, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    with (aura) {
        __b__ = action_if_variable(dawn, 0, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        with (r12) {
            action_set_relative(1);
            ele = ele + 9;
            action_set_relative(0);
        }
    }
}
action_set_relative(0);
