/// gml_Object_reversi_KeyPress_8
// locals: __b__
__b__ = action_if_number(149, 0, 0);
if (__b__) {
    __b__ = action_if_number(148, 0, 0);
    if (__b__) {
        with (pu1) {
            __b__ = action_if_variable(menoo, 0, 0);
            if (__b__) {
                break;
            }
        }
        if (__b__) {
            action_create_object(disba, 0, 0);
            action_set_alarm(30, 0);
        } else {
            with (positiona) {
                x = positionb.x;
            }
            with (pu1) {
                menoo = 0;
            }
        }
    }
}
__b__ = action_if_number(148, 0, 0);
if (!__b__) {
    with (resetscrino) {
        action_kill_object();
    }
    with (resetbuttone) {
        action_kill_object();
    }
    with (resetbecco) {
        action_kill_object();
    }
    with (resetrelotto) {
        action_kill_object();
    }
}
__b__ = action_if_number(149, 0, 0);
if (!__b__) {
    with (backotrade) {
        action_kill_object();
    }
    with (tradoscrino) {
        action_kill_object();
    }
    with (get1) {
        action_kill_object();
    }
    with (get2) {
        action_kill_object();
    }
    with (get3) {
        action_kill_object();
    }
    with (get4) {
        action_kill_object();
    }
}
