/// gml_Object_placeholder_Collision_445
// locals: __b__
action_set_relative(1);
with (r12) {
    __b__ = action_if_variable(selec, 82, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    __b__ = action_if_variable(auta, 0, 0);
    if (__b__) {
        with (r12) {
            __b__ = action_if_variable(mon, 200000, 4);
            if (__b__) {
                break;
            }
        }
        if (__b__) {
            with (other.id) {
                places = places + 1;
            }
            action_set_relative(0);
            auta = 1;
            action_set_relative(1);
            action_set_relative(0);
            action_set_alarm(4, 0);
            action_set_relative(1);
            action_set_relative(0);
            exit;
        }
    }
    with (r12) {
        __b__ = action_if_variable(mon, 200000, 4);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        with (other.id) {
            __b__ = action_if_variable(places, 4, 4);
        }
        if (__b__) {
            action_create_object(mon_bbil, -1559, 680);
            action_kill_object();
        }
    }
}
with (r12) {
    __b__ = action_if_variable(selec, 4, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    __b__ = action_if_variable(auta, 0, 0);
    if (__b__) {
        with (r12) {
            __b__ = action_if_variable(mon, 50000, 4);
            if (__b__) {
                break;
            }
        }
        if (__b__) {
            with (other.id) {
                places = places + 1;
            }
            action_set_relative(0);
            auta = 1;
            action_set_relative(1);
            action_set_relative(0);
            action_set_alarm(4, 0);
            action_set_relative(1);
            action_set_relative(0);
            exit;
        }
    }
    with (r12) {
        __b__ = action_if_variable(mon, 50000, 4);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        with (other.id) {
            __b__ = action_if_variable(places, 4, 4);
        }
        if (__b__) {
            action_create_object(mon_bbil, -1559, 680);
            action_kill_object();
        }
    }
}
action_set_relative(0);
