/// gml_Object_chies_Step_0
// locals: __b__
action_set_relative(1);
__b__ = action_if_number(617, 0, 2);
if (__b__) {
    __b__ = action_if_variable(updue, 0, 0);
    if (__b__) {
        with (r12) {
            __b__ = action_if_variable(pop, 500, 4);
            if (__b__) {
                break;
            }
        }
        if (__b__) {
            action_create_object(upcrc12, 0, 0);
            action_set_relative(0);
            updue = 1;
            action_set_relative(1);
        }
    }
}
__b__ = action_if_variable(uptre, 0, 0);
if (__b__) {
    __b__ = action_if_number(736, 0, 2);
    if (!__b__) {
        with (r12) {
            __b__ = action_if_variable(pop, 1500, 4);
            if (__b__) {
                break;
            }
        }
        if (__b__) {
            action_create_object(upcrc23, 0, 0);
            action_set_relative(0);
            uptre = 1;
            action_set_relative(1);
        }
    }
}
__b__ = action_if_variable(life, 0, 3);
if (__b__) {
    __b__ = action_if_variable(distrutta, 0, 0);
    if (__b__) {
        with (tradebuttoner) {
            action_kill_object();
        }
        with (cddvd) {
            action_kill_object();
        }
        with (cddvd2) {
            action_kill_object();
        }
        with (cddvd3) {
            action_kill_object();
        }
        with (cddvd32) {
            action_kill_object();
        }
        with (cddvd33) {
            action_kill_object();
        }
        with (cddvd34) {
            action_kill_object();
        }
        with (cddvd35) {
            action_kill_object();
        }
        action_set_relative(0);
        distrutta = 1;
        action_set_relative(1);
        __b__ = action_if_variable(level, 1, 0);
        if (__b__) {
            action_sprite_set(ruinc1, 0, 1);
        }
        __b__ = action_if_variable(level, 2, 0);
        if (__b__) {
            action_sprite_set(ruinc2, 0, 1);
        }
        __b__ = action_if_variable(level, 3, 0);
        if (__b__) {
            action_sprite_set(ruinc3, 0, 1);
        }
    }
}
__b__ = action_if_variable(level, 2, 0);
if (__b__) {
    __b__ = action_if_number(131, 0, 0);
    if (__b__) {
        action_create_object(tradebuttoner, -60, 30);
    }
}
action_set_relative(0);
