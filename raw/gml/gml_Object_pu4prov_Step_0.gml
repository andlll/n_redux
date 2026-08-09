/// gml_Object_pu4prov_Step_0
// locals: __b__
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
with (pu1) {
    __b__ = action_if_variable(menoo, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_move_to(view_xview[0] + 984 * global.sca + shifta, view_hview[0] + view_yview[0]);
} else {
    action_move_to(-1000, -1000);
}
__b__ = action_if_variable(unlos, 1, 0);
if (__b__) {
    __b__ = action_if_variable(over, 0, 0);
    if (__b__) {
        with (r12) {
            __b__ = action_if_variable(selec, 4, 0);
            if (__b__) {
                break;
            }
        }
        if (__b__) {
            action_sprite_set(p4ss, 0, 1);
        } else {
            action_sprite_set(p4, 0, 1);
        }
    }
}
__b__ = action_if_variable(unlos, 0, 0);
if (__b__) {
    with (chies) {
        __b__ = action_if_variable(level, 3, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        __b__ = action_if_number(736, 0, 0);
        if (__b__) {
            unlos = 1;
        }
    }
}
