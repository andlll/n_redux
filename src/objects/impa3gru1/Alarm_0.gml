/// gml_Object_impa3gru1_Alarm_0
if (rota == 0) {
    if (phase == 1) {
        phase = phase + 1;
        sprite_index = 163;
        alarm[0] = 10;
        exit;
    }
    if (phase == 2) {
        phase = phase + 1;
        sprite_index = 164;
        alarm[0] = 10;
        exit;
    }
    if (phase == 3) {
        phase = phase + 1;
        sprite_index = 165;
        alarm[0] = 10;
        exit;
    }
    if (phase == 4) {
        phase = phase + 1;
        sprite_index = 166;
        alarm[0] = 10;
        exit;
    }
    if (phase == 5) {
        sprite_index = 167;
        alarm[0] = 120;
        rota = 1;
        exit;
    }
} else {
    if (phase == 1) {
        sprite_index = 162;
        alarm[0] = 120;
        rota = 0;
        exit;
    }
    if (phase == 2) {
        phase = phase - 1;
        sprite_index = 163;
        alarm[0] = 10;
        exit;
    }
    if (phase == 3) {
        phase = phase - 1;
        sprite_index = 164;
        alarm[0] = 10;
        exit;
    }
    if (phase == 4) {
        phase = phase - 1;
        sprite_index = 165;
        alarm[0] = 10;
        exit;
    }
    if (phase == 5) {
        phase = phase - 1;
        sprite_index = 166;
        alarm[0] = 120;
    }
}
