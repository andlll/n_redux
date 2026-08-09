// gml_Object_honda_brr2_Create_0  locals=2 args=0 len=328
// locals: arguments, __b__
00000000: push.imm.e 2
00000004: conv.i.v
00000008: call action_if_dice(argc=1)
00000010: pop.v.v local.__b__
00000018: push.local.v local.__b__
00000020: conv.v.b
00000024: bf 0x20A8E0C
00000028: push.imm.e 0
0000002C: conv.i.v
00000030: push.imm.e 0
00000034: conv.i.v
00000038: push.imm.e 54
0000003C: conv.i.v
00000040: call action_create_object(argc=3)
00000048: popz
0000004C: call action_kill_object(argc=0)
00000054: popz
00000058: push.imm.e 1257
0000005C: conv.i.v
00000060: push.imm.e 2368
00000064: conv.i.v
00000068: call action_move_to(argc=2)
00000070: popz
00000074: push.imm.e 0
00000078: conv.i.v
0000007C: push.imm.e 165
00000080: conv.i.v
00000084: call action_set_alarm(argc=2)
0000008C: popz
00000090: push.imm.e 1
00000094: conv.i.v
00000098: push.imm.e 184
0000009C: conv.i.v
000000A0: call action_set_alarm(argc=2)
000000A8: popz
000000AC: push.imm.e 3
000000B0: conv.i.v
000000B4: push.imm.e 30
000000B8: conv.i.v
000000BC: call action_set_motion(argc=2)
000000C4: popz
000000C8: push.imm.e 455
000000CC: pushenv 0x20A8EC0
000000D0: push.imm.e 0
000000D4: conv.i.v
000000D8: push.imm.e 1
000000DC: conv.i.v
000000E0: push.v night
000000E8: call action_if_variable(argc=3)
000000F0: pop.v.v local.__b__
000000F8: push.local.v local.__b__
00000100: conv.v.b
00000104: bf 0x20A8EC0
00000108: b 0x20A8EC8
0000010C: popenv 0x40A8E84
00000110: b 0x20A8ECC
00000114: popenv 0x1CA8EC8
00000118: push.local.v local.__b__
00000120: conv.v.b
00000124: bf 0x20A8EFC
00000128: push.imm.e 1
0000012C: conv.i.v
00000130: push.i 16366009
00000138: conv.i.v
0000013C: call action_sprite_color(argc=2)
00000144: popz