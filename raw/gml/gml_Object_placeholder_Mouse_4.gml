/// gml_Object_placeholder_Mouse_4
// locals: __b__
action_set_relative(0);
__b__ = action_if_variable(mouse_y, view_yview[0] + view_hview[0] - 100, 1);
if (__b__) {
    __b__ = action_if_variable(act, 1, 0);
    if (__b__) {
        with (r12) {
            __b__ = action_if_variable(selec, 6, 0);
            if (__b__) {
                break;
            }
        }
        if (__b__) {
            with (r12) {
                __b__ = action_if_variable(mon, 6000, 4);
                if (__b__) {
                    break;
                }
            }
            if (__b__) {
                making = 1;
                with (scroller2) {
                    goer = 0;
                }
                action_sprite_set(phold, 0, 1);
                action_sprite_color(255, 1);
                action_set_relative(1);
                action_create_object(cre1, 99, 57);
                action_set_relative(0);
                action_set_relative(1);
                action_create_object(cre2, 99, -57);
                action_set_relative(0);
                action_set_relative(1);
                action_create_object(cre3, -99, -57);
                action_set_relative(0);
                action_set_relative(1);
                action_create_object(cre4, -99, 57);
                action_set_relative(0);
            }
        }
        with (r12) {
            __b__ = action_if_variable(selec, 70, 0);
            if (__b__) {
                break;
            }
        }
        if (__b__) {
            with (r12) {
                __b__ = action_if_variable(mon, 35000, 4);
                if (__b__) {
                    break;
                }
            }
            if (__b__) {
                making = 1;
                with (scroller2) {
                    goer = 0;
                }
                action_sprite_set(phold, 0, 1);
                action_sprite_color(255, 1);
                action_set_relative(1);
                action_create_object(cre1, 99, 57);
                action_set_relative(0);
                action_set_relative(1);
                action_create_object(cre2, 99, -57);
                action_set_relative(0);
                action_set_relative(1);
                action_create_object(cre3, -99, -57);
                action_set_relative(0);
                action_set_relative(1);
                action_create_object(cre4, -99, 57);
                action_set_relative(0);
            }
        }
    }
}
action_set_relative(0);
