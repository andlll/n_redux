/// gml_Object_eoliplacer_Alarm_1
// locals: __b__
action_set_relative(1);
with (r12) {
    __b__ = action_if_variable(selec, 82, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(mon, 200000, 4);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        __b__ = action_if_variable(rav, 0, 0);
        if (__b__) {
            __b__ = action_if_variable(places, 4, 1);
            if (__b__) {
                action_create_object(fantoccio, 0, 0);
                action_set_relative(0);
                action_set_alarm(2, 0);
                action_set_relative(1);
                action_set_relative(0);
                rav = 1;
                action_set_relative(1);
                action_set_relative(0);
                exit;
            }
        }
        __b__ = action_if_variable(places, 4, 4);
        if (__b__) {
            action_create_object(m3cant, 0, 116);
            with (r12) {
                mon = mon + -200000;
            }
            action_kill_object();
            action_set_relative(0);
            exit;
        }
    }
    with (r12) {
        __b__ = action_if_variable(mon, 50000, 4);
        if (!__b__) {
            break;
        }
    }
    if (!__b__) {
        action_kill_object();
    }
}
with (r12) {
    __b__ = action_if_variable(selec, 4, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(mon, 50000, 4);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        __b__ = action_if_variable(rav, 0, 0);
        if (__b__) {
            __b__ = action_if_variable(places, 4, 1);
            if (__b__) {
                action_create_object(fantoccio, 0, 0);
                action_set_relative(0);
                action_set_alarm(2, 0);
                action_set_relative(1);
                action_set_relative(0);
                rav = 1;
                action_set_relative(1);
                action_set_relative(0);
                exit;
            }
        }
        __b__ = action_if_variable(places, 4, 4);
        if (__b__) {
            action_create_object(impavent, 0, 0);
            with (r12) {
                mon = mon + -50000;
            }
            action_kill_object();
            action_set_relative(0);
            exit;
        }
    }
    with (r12) {
        __b__ = action_if_variable(mon, 50000, 4);
        if (!__b__) {
            break;
        }
    }
    if (!__b__) {
        action_kill_object();
    }
}
action_set_relative(0);
