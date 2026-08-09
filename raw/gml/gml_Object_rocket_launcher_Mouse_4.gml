/// gml_Object_rocket_launcher_Mouse_4
// locals: __b__
action_set_relative(0);
__b__ = action_if_number(15, 0, 2);
if (__b__) {
    __b__ = action_if_variable(distance_to_object(veicoli_target), 400, 1);
    if (__b__) {
        __b__ = action_if_variable(launching, 1, 0);
        if (__b__) {
            with (r12) {
                selec = 0;
            }
            launching = 0;
            action_set_alarm(40, 6);
            __b__ = action_if_variable(instance_nearest(x, y, veicoli_target).x, x, 2);
            if (__b__) {
                __b__ = action_if_variable(instance_nearest(x, y, veicoli_target).y + 93, y, 2);
                if (__b__) {
                    action_set_relative(1);
                    action_create_object(rol_avant, 53, -93);
                    action_set_relative(0);
                    action_set_relative(1);
                    action_create_object(red_ball, 53, -93);
                    action_set_relative(0);
                }
            }
            __b__ = action_if_variable(instance_nearest(x, y, veicoli_target).x, x, 3);
            if (__b__) {
                __b__ = action_if_variable(instance_nearest(x, y, veicoli_target).y + 93, y, 2);
                if (__b__) {
                    action_set_relative(1);
                    action_create_object(rol_avant, -13, -70);
                    action_set_relative(0);
                    action_set_relative(1);
                    action_create_object(red_ball, -13, -70);
                    action_set_relative(0);
                }
            }
            __b__ = action_if_variable(instance_nearest(x, y, veicoli_target).x, x, 2);
            if (__b__) {
                __b__ = action_if_variable(instance_nearest(x, y, veicoli_target).y + 93, y, 3);
                if (__b__) {
                    action_set_relative(1);
                    action_create_object(rol_diet, 29, -110);
                    action_set_relative(0);
                    action_set_relative(1);
                    action_create_object(red_ball, 29, -110);
                    action_set_relative(0);
                }
            }
            __b__ = action_if_variable(instance_nearest(x, y, veicoli_target).x, x, 3);
            if (__b__) {
                __b__ = action_if_variable(instance_nearest(x, y, veicoli_target).y + 93, y, 3);
                if (__b__) {
                    action_set_relative(1);
                    action_create_object(red_ball, -12, -116);
                    action_set_relative(0);
                    action_set_relative(1);
                    action_create_object(rol_diet, -12, -116);
                    action_set_relative(0);
                }
            }
        }
    }
}
with (r12) {
    __b__ = action_if_variable(selec, 11, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(mon, 20000, 4);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        __b__ = action_if_number(127, 0, 0);
        if (__b__) {
            redder = 1;
            action_set_relative(1);
            action_create_object(demobasia, 0, 0);
            action_set_relative(0);
            action_set_alarm(2, 9);
            action_sprite_color(255, 1);
        }
    }
}
action_set_relative(0);
