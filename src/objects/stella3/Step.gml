/// gml_Object_stella3_Step_0
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
    action_move_to(pu1.x + 200 * global.sca, pu1.y - 100 * global.sca);
} else {
    action_move_to(-1000, -1000);
}
__b__ = action_if_variable(unlocinque, 1, 0);
if (__b__) {
    __b__ = action_if_variable(over, 0, 0);
    if (__b__) {
        with (r12) {
            __b__ = action_if_variable(selec, 82, 0);
            if (__b__) {
                break;
            }
        }
        if (__b__) {
            action_sprite_set(sta3s, 0, 1);
        } else {
            action_sprite_set(sta3, 0, 1);
        }
    }
} else {
    action_sprite_set(sta3x, 0, 1);
}
__b__ = action_if_variable(unlocinque, 1, 0);
if (__b__) {
    __b__ = action_if_number(483, 0, 2);
    if (__b__) {
        with (r12) {
            selec = 0;
        }
        unlocinque = 0;
    }
}
__b__ = action_if_variable(unlocinque, 0, 0);
if (__b__) {
    __b__ = action_if_number(483, 0, 2);
    if (__b__) {
        with (r12) {
            __b__ = action_if_variable(biotech, 100, 4);
            if (__b__) {
                break;
            }
        }
        if (__b__) {
            with (r12) {
                biotech = 0;
            }
            unlocinque = 1;
        }
    }
}
