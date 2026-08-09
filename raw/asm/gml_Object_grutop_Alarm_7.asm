// gml_Object_grutop_Alarm_7  locals=2 args=0 len=244
// locals: arguments, __b__
00000000: push.imm.e 2
00000004: conv.i.v
00000008: call action_if_dice(argc=1)
00000010: pop.v.v local.__b__
00000018: push.local.v local.__b__
00000020: conv.v.b
00000024: bf 0x2169F58
00000028: push.imm.e 2
0000002C: conv.i.v
00000030: call action_if_dice(argc=1)
00000038: pop.v.v local.__b__
00000040: push.local.v local.__b__
00000048: conv.v.b
0000004C: bf 0x2169F14
00000050: push.imm.e 1
00000054: conv.i.v
00000058: push.imm.e 0
0000005C: conv.i.v
00000060: push.imm.e 284
00000064: conv.i.v
00000068: call action_sprite_set(argc=3)
00000070: popz
00000074: push.imm.e 2
00000078: conv.i.v
0000007C: push.imm.e 28
00000080: conv.i.v
00000084: call action_set_alarm(argc=2)
0000008C: popz
00000090: b 0x2169F54
00000094: push.imm.e 1
00000098: conv.i.v
0000009C: push.imm.e 0
000000A0: conv.i.v
000000A4: push.imm.e 286
000000A8: conv.i.v
000000AC: call action_sprite_set(argc=3)
000000B4: popz
000000B8: push.imm.e 3
000000BC: conv.i.v
000000C0: push.imm.e 28
000000C4: conv.i.v
000000C8: call action_set_alarm(argc=2)
000000D0: popz
000000D4: b 0x2169F74
000000D8: push.imm.e 7
000000DC: conv.i.v
000000E0: push.imm.e 52
000000E4: conv.i.v
000000E8: call action_set_alarm(argc=2)
000000F0: popz