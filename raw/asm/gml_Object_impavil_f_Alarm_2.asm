// gml_Object_impavil_f_Alarm_2  locals=2 args=0 len=304
// locals: arguments, __b__
00000000: push.imm.e 2
00000004: conv.i.v
00000008: call action_if_dice(argc=1)
00000010: pop.v.v local.__b__
00000018: push.local.v local.__b__
00000020: conv.v.b
00000024: bf 0x2149958
00000028: push.imm.e 2
0000002C: conv.i.v
00000030: call action_if_dice(argc=1)
00000038: pop.v.v local.__b__
00000040: push.local.v local.__b__
00000048: conv.v.b
0000004C: bf 0x2149930
00000050: push.imm.e 1
00000054: conv.i.v
00000058: push.imm.e 0
0000005C: conv.i.v
00000060: push.imm.e 295
00000064: conv.i.v
00000068: call action_sprite_set(argc=3)
00000070: popz
00000074: b 0x2149954
00000078: push.imm.e 1
0000007C: conv.i.v
00000080: push.imm.e 0
00000084: conv.i.v
00000088: push.imm.e 296
0000008C: conv.i.v
00000090: call action_sprite_set(argc=3)
00000098: popz
0000009C: b 0x21499CC
000000A0: push.imm.e 2
000000A4: conv.i.v
000000A8: call action_if_dice(argc=1)
000000B0: pop.v.v local.__b__
000000B8: push.local.v local.__b__
000000C0: conv.v.b
000000C4: bf 0x21499A8
000000C8: push.imm.e 1
000000CC: conv.i.v
000000D0: push.imm.e 0
000000D4: conv.i.v
000000D8: push.imm.e 297
000000DC: conv.i.v
000000E0: call action_sprite_set(argc=3)
000000E8: popz
000000EC: b 0x21499CC
000000F0: push.imm.e 1
000000F4: conv.i.v
000000F8: push.imm.e 0
000000FC: conv.i.v
00000100: push.imm.e 298
00000104: conv.i.v
00000108: call action_sprite_set(argc=3)
00000110: popz
00000114: push.imm.e 5
00000118: conv.i.v
0000011C: push.imm.e 40
00000120: conv.i.v
00000124: call action_set_alarm(argc=2)
0000012C: popz