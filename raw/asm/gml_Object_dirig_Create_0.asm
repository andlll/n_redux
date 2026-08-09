// gml_Object_dirig_Create_0  locals=2 args=0 len=288
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: pop.v.i piro
0000000C: push.imm.e 10
00000010: pop.v.i life
00000018: push.imm.e 2
0000001C: conv.i.v
00000020: push.imm.e 30
00000024: conv.i.v
00000028: call action_set_motion(argc=2)
00000030: popz
00000034: push.imm.e -3990
00000038: pop.v.i depth
00000040: push.imm.e 1
00000044: pop.v.i desto
0000004C: push.imm.e 455
00000050: pushenv 0x20B1B30
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.imm.e 1
00000060: conv.i.v
00000064: push.v night
0000006C: call action_if_variable(argc=3)
00000074: pop.v.v local.__b__
0000007C: push.local.v local.__b__
00000084: conv.v.b
00000088: bf 0x20B1B30
0000008C: b 0x20B1B38
00000090: popenv 0x40B1AF4
00000094: b 0x20B1B3C
00000098: popenv 0x1CB1B38
0000009C: push.local.v local.__b__
000000A4: conv.v.b
000000A8: bf 0x20B1B6C
000000AC: push.imm.e 1
000000B0: conv.i.v
000000B4: push.i 16366009
000000BC: conv.i.v
000000C0: call action_sprite_color(argc=2)
000000C8: popz
000000CC: push.imm.e 0
000000D0: conv.i.v
000000D4: push.imm.e 30
000000D8: conv.i.v
000000DC: call action_set_alarm(argc=2)
000000E4: popz
000000E8: push.imm.e 1
000000EC: conv.i.v
000000F0: push.imm.e 10000
000000F4: conv.i.v
000000F8: call action_set_alarm(argc=2)
00000100: popz
00000104: push.imm.e 5
00000108: conv.i.v
0000010C: push.imm.e 74
00000110: conv.i.v
00000114: call action_set_alarm(argc=2)
0000011C: popz