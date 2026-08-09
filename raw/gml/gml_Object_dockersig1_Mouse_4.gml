/// gml_Object_dockersig1_Mouse_4
// locals: __b__
action_set_relative(1);
__b__ = action_if_variable(os_type, 4, 0);
if (__b__) {
    __b__ = action_if_variable(phase, 0, 0);
    if (__b__) {
        action_create_object(cbase1, 0, 0);
        action_set_relative(0);
        phase = 1;
        action_set_relative(1);
    } else {
        with (r12) {
            __b__ = action_if_variable(mon, 5000, 4);
            if (__b__) {
                break;
            }
        }
        if (__b__) {
            with (r12) {
                __b__ = action_if_variable(oil, 9000, 4);
                if (__b__) {
                    break;
                }
            }
            if (__b__) {
                action_set_relative(0);
                active = 1;
                action_set_relative(1);
                action_sprite_set(empty2, 0, 1);
                with (wavesig1) {
                    action_kill_object();
                }
                action_set_relative(0);
                action_set_alarm(40, 0);
                action_set_relative(1);
                action_set_relative(0);
                action_set_alarm(80, 1);
                action_set_relative(1);
                action_set_relative(0);
                action_set_alarm(120, 2);
                action_set_relative(1);
                action_set_relative(0);
                action_set_alarm(160, 3);
                action_set_relative(1);
                action_set_relative(0);
                action_set_alarm(200, 5);
                action_set_relative(1);
                action_set_relative(0);
                action_set_alarm(840, 4);
                action_set_relative(1);
                action_set_relative(0);
                action_create_object(n_cluster1, 5000, -1000);
                action_set_relative(1);
                action_set_relative(0);
                action_create_object(n_cluster1, 5000, 0);
                action_set_relative(1);
                action_set_relative(0);
                action_create_object(n_cluster1, 5000, 1000);
                action_set_relative(1);
                action_set_relative(0);
                action_create_object(n_cluster1, 5000, 2000);
                action_set_relative(1);
                action_set_relative(0);
                action_create_object(n_cluster1, 5000, 3000);
                action_set_relative(1);
                with (r12) {
                    mon = mon + -5000;
                }
                with (r12) {
                    oil = oil + -9000;
                }
            }
        }
    }
}
__b__ = action_if_variable(os_type, 0, 0);
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(mon, 5000, 4);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        with (r12) {
            __b__ = action_if_variable(oil, 9000, 4);
            if (__b__) {
                break;
            }
        }
        if (__b__) {
            action_set_relative(0);
            active = 1;
            action_set_relative(1);
            action_sprite_set(empty2, 0, 1);
            with (wavesig1) {
                action_kill_object();
            }
            action_set_relative(0);
            action_set_alarm(40, 0);
            action_set_relative(1);
            action_set_relative(0);
            action_set_alarm(80, 1);
            action_set_relative(1);
            action_set_relative(0);
            action_set_alarm(120, 2);
            action_set_relative(1);
            action_set_relative(0);
            action_set_alarm(160, 3);
            action_set_relative(1);
            action_set_relative(0);
            action_set_alarm(200, 5);
            action_set_relative(1);
            action_set_relative(0);
            action_set_alarm(840, 4);
            action_set_relative(1);
            action_set_relative(0);
            action_create_object(n_cluster1, 5000, -1000);
            action_set_relative(1);
            action_set_relative(0);
            action_create_object(n_cluster1, 5000, 0);
            action_set_relative(1);
            action_set_relative(0);
            action_create_object(n_cluster1, 5000, 1000);
            action_set_relative(1);
            action_set_relative(0);
            action_create_object(n_cluster1, 5000, 2000);
            action_set_relative(1);
            action_set_relative(0);
            action_create_object(n_cluster1, 5000, 3000);
            action_set_relative(1);
            with (r12) {
                mon = mon + -5000;
            }
            with (r12) {
                oil = oil + -9000;
            }
        }
    }
}
action_set_relative(0);
