/// gml_Object_impa31r_Alarm_0
// locals: __b__
__b__ = action_if_variable(demos, 0, 0);
if (__b__) {
    action_set_alarm(24, 0);
    if (phase == 1) {
        sprite_index = 43;
        phase = phase + 1;
        exit;
    }
    if (phase == 2) {
        sprite_index = 41;
        phase = phase + 1;
        exit;
    }
    if (phase == 3) {
        sprite_index = 39;
        phase = phase + 1;
        exit;
    }
    if (phase == 4) {
        sprite_index = 37;
        phase = phase + 1;
        exit;
    }
    if (phase == 5) {
        sprite_index = 35;
        phase = phase + 1;
        exit;
    }
    if (phase == 6) {
        sprite_index = 33;
        phase = phase + 1;
        exit;
    }
    if (phase == 7) {
        sprite_index = 31;
        phase = phase + 1;
        exit;
    }
    if (phase == 8) {
        sprite_index = 29;
        phase = phase + 1;
        exit;
    }
    if (phase == 9) {
        sprite_index = 27;
        phase = phase + 1;
        exit;
    }
    if (phase == 10) {
        sprite_index = 25;
        phase = phase + 1;
        exit;
    }
    if (phase == 11) {
        sprite_index = 23;
        phase = phase + 1;
        exit;
    }
    if (phase == 12) {
        sprite_index = 21;
        phase = phase + 1;
        exit;
    }
    if (phase == 13) {
        sprite_index = 19;
        phase = phase + 1;
        exit;
    }
    if (phase == 14) {
        sprite_index = 17;
        phase = phase + 1;
        exit;
    }
    if (phase == 15) {
        sprite_index = 15;
        phase = phase + 1;
        exit;
    }
    if (phase == 16) {
        sprite_index = 13;
        phase = phase + 1;
        exit;
    }
    if (phase == 17) {
        sprite_index = 11;
        phase = phase + 1;
        exit;
    }
}
with (r12) {
    __b__ = action_if_variable(ele, -1000, 2);
    if (__b__) {
        break;
    }
}
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(mon, -1000, 2);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
    }
}
