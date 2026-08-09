/// gml_Object_pu1_Step_0
// locals: __b__
action_set_relative(0);
action_sprite_transform(global.sca, global.sca, 0, 0);
shifta = positionb.x - positiona.x;
__b__ = action_if_variable(shifta, 0, 2);
if (__b__) {
    shifta = 0;
}
__b__ = action_if_variable(shifta, -1000, 1);
if (__b__) {
    shifta = -1000;
}
__b__ = action_if_variable(menoo, 1, 0);
if (__b__) {
    action_move_to(view_xview[0] + shifta, view_hview[0] + view_yview[0]);
} else {
    action_move_to(-1000, -1000);
}
__b__ = action_if_variable(over, 0, 0);
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(selec, 1, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        action_sprite_set(p1ss, 0, 1);
    } else {
        action_sprite_set(p1, 0, 1);
    }
}
__b__ = action_if_variable(distrutti, 49, 2);
if (__b__) {
    __b__ = action_if_number(619, 0, 0);
    if (__b__) {
        action_set_relative(1);
        action_create_object(stella1, 0, 0);
        action_set_relative(0);
    }
}
__b__ = action_if_number(190, 0, 2);
if (__b__) {
    with (chies) {
        __b__ = action_if_variable(level, 1, 2);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        __b__ = action_if_number(620, 0, 0);
        if (__b__) {
            with (r12) {
                __b__ = action_if_variable(pop, 3000, 4);
                if (__b__) {
                    break;
                }
            }
            if (__b__) {
                action_set_relative(1);
                action_create_object(stella2, 0, 0);
                action_set_relative(0);
            }
        }
    }
}
action_set_relative(0);
