/// gml_Object_crysmenu_Step_0
// locals: __b__
__b__ = action_if_number(736, 0, 0);
if (__b__) {
    __b__ = action_if_number(291, 0, 0);
    if (__b__) {
        with (r12) {
            __b__ = action_if_variable(dara, 0, 0);
            if (__b__) {
                break;
            }
        }
        if (__b__) {
            with (r12) {
                __b__ = action_if_variable(oil, 0, 3);
                if (__b__) {
                    break;
                }
            }
            if (__b__) {
                action_kill_object();
            }
        }
    }
}
action_sprite_transform(global.sca, global.sca, 0, 0);
action_move_to(view_xview[0], view_yview[0] + 60 * global.sca);
with (r12) {
    __b__ = action_if_variable(crys, 0, 2);
    if (__b__) {
        break;
    }
}
if (__b__) {
    __b__ = action_if_variable(cambiato, 0, 0);
    if (__b__) {
        if (global.hc == 0) {
            sprite_index = 400;
        }
        if (global.hc == 1) {
            sprite_index = 403;
        }
        cambiato = 1;
    }
}
__b__ = action_if_variable(cambiato, 1, 0);
if (__b__) {
    if (global.hc == 0) {
        sprite_index = 400;
    }
    if (global.hc == 1) {
        sprite_index = 403;
    }
}
with (r12) {
    __b__ = action_if_variable(biotech, 0, 2);
    if (__b__) {
        break;
    }
}
if (__b__) {
    __b__ = action_if_number(483, 0, 2);
    if (__b__) {
        if (global.hc == 0) {
            sprite_index = 401;
        }
        if (global.hc == 1) {
            sprite_index = 402;
        }
        cambiato = 3;
    }
}
__b__ = action_if_number(159, 0, 2);
if (__b__) {
    __b__ = action_if_number(161, 0, 2);
    if (__b__) {
        __b__ = action_if_variable(cambiato, 3, 1);
        if (__b__) {
            with (r12) {
                crys = 0;
            }
            cambiato = 2;
        }
    }
}
__b__ = action_if_variable(cambiato, 2, 0);
if (__b__) {
    sprite_index = 518;
}
__b__ = action_if_number(483, 0, 2);
if (__b__) {
    sprite_index = 518;
}
