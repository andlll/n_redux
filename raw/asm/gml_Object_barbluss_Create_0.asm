// gml_Object_barbluss_Create_0  locals=2 args=0 len=188
// locals: arguments, __b__
00000000: push.imm.e 455
00000004: pushenv 0x20B2354
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 1
00000014: conv.i.v
00000018: push.v night
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x20B2354
00000040: b 0x20B235C
00000044: popenv 0x40B2318
00000048: b 0x20B2360
0000004C: popenv 0x1CB235C
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x20B2390
00000060: push.imm.e 1
00000064: conv.i.v
00000068: push.i 16366009
00000070: conv.i.v
00000074: call action_sprite_color(argc=2)
0000007C: popz
00000080: push.imm.e 4
00000084: conv.i.v
00000088: push.s "010000000"
00000090: conv.s.v
00000094: call action_move(argc=2)
0000009C: popz
000000A0: push.imm.e 0
000000A4: conv.i.v
000000A8: push.imm.e 700
000000AC: conv.i.v
000000B0: call action_set_alarm(argc=2)
000000B8: popz