/// gml_Object_upcrc23_Mouse_4
// locals: __b__
action_set_relative(0);
__b__ = action_if_variable(os_type, 4, 0);
if (__b__) {
    __b__ = action_if_variable(phase, 0, 0);
    if (__b__) {
        phase = 1;
        action_set_relative(1);
        action_create_object(chies23a, 0, -50);
        action_set_relative(0);
    } else {
        with (r12) {
            __b__ = action_if_variable(mon, 15000, 4);
            if (__b__) {
                break;
            }
        }
        if (__b__) {
            __b__ = action_if_variable(avata, 0, 0);
            if (__b__) {
                with (r12) {
                    __b__ = action_if_variable(oil, 9000, 4);
                    if (__b__) {
                        break;
                    }
                }
                if (__b__) {
                    with (chies) {
                        level = 4;
                    }
                    avata = 1;
                    with (r12) {
                        action_set_relative(1);
                        mon = mon + -15000;
                        action_set_relative(0);
                    }
                    with (r12) {
                        action_set_relative(1);
                        oil = oil + -9000;
                        action_set_relative(0);
                    }
                    action_set_relative(1);
                    action_effect(1, 0, -50, 1, 3989790, 0);
                    action_set_relative(0);
                    with (chies23a) {
                        action_kill_object();
                    }
                    with (cddvd2) {
                        action_kill_object();
                    }
                    with (chies) {
                        action_sprite_set(ci21, 0, 1);
                    }
                    action_sprite_set(empty, 0, 1);
                    action_set_alarm(60, 0);
                }
            }
        }
    }
}
with (r12) {
    selec = 0;
}
__b__ = action_if_variable(os_type, 0, 0);
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(mon, 15000, 4);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        __b__ = action_if_variable(avata, 0, 0);
        if (__b__) {
            with (r12) {
                __b__ = action_if_variable(oil, 9000, 4);
                if (__b__) {
                    break;
                }
            }
            if (__b__) {
                with (chies) {
                    level = 4;
                }
                avata = 1;
                with (r12) {
                    action_set_relative(1);
                    mon = mon + -15000;
                    action_set_relative(0);
                }
                with (r12) {
                    action_set_relative(1);
                    oil = oil + -9000;
                    action_set_relative(0);
                }
                action_set_relative(1);
                action_effect(1, 0, -50, 1, 3989790, 0);
                action_set_relative(0);
                with (chies23a) {
                    action_kill_object();
                }
                with (cddvd2) {
                    action_kill_object();
                }
                with (chies) {
                    action_sprite_set(ci21, 0, 1);
                }
                action_sprite_set(empty, 0, 1);
                action_set_alarm(60, 0);
            }
        }
    }
}
action_set_relative(0);
