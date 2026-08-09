// gml_Object_ni_Create_0  locals=2 args=0 len=404
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 1200
0000000C: conv.i.v
00000010: call action_set_alarm(argc=2)
00000018: popz
0000001C: push.imm.e 2
00000020: conv.i.v
00000024: call action_if_dice(argc=1)
0000002C: pop.v.v local.__b__
00000034: push.local.v local.__b__
0000003C: conv.v.b
00000040: bf 0x213AD08
00000044: push.imm.e -3990
00000048: pop.v.i depth
00000050: b 0x213AD14
00000054: push.imm.e 20
00000058: pop.v.i depth
00000060: push.imm.e 2
00000064: conv.i.v
00000068: call action_if_dice(argc=1)
00000070: pop.v.v local.__b__
00000078: push.local.v local.__b__
00000080: conv.v.b
00000084: bf 0x213ADB0
00000088: push.imm.e 2
0000008C: conv.i.v
00000090: call action_if_dice(argc=1)
00000098: pop.v.v local.__b__
000000A0: push.local.v local.__b__
000000A8: conv.v.b
000000AC: bf 0x213AD8C
000000B0: push.imm.e 1
000000B4: conv.i.v
000000B8: push.imm.e 0
000000BC: conv.i.v
000000C0: push.imm.e 670
000000C4: conv.i.v
000000C8: call action_sprite_set(argc=3)
000000D0: popz
000000D4: b 0x213ADB0
000000D8: push.imm.e 1
000000DC: conv.i.v
000000E0: push.imm.e 0
000000E4: conv.i.v
000000E8: push.imm.e 672
000000EC: conv.i.v
000000F0: call action_sprite_set(argc=3)
000000F8: popz
000000FC: push.imm.e 2
00000100: conv.i.v
00000104: call action_if_dice(argc=1)
0000010C: pop.v.v local.__b__
00000114: push.local.v local.__b__
0000011C: conv.v.b
00000120: bf 0x213ADF8
00000124: push.imm.e 7
00000128: conv.i.v
0000012C: push.imm.e 30
00000130: conv.i.v
00000134: call action_set_motion(argc=2)
0000013C: popz
00000140: b 0x213AE14
00000144: push.imm.e 4
00000148: conv.i.v
0000014C: push.imm.e 30
00000150: conv.i.v
00000154: call action_set_motion(argc=2)
0000015C: popz
00000160: push.imm.e 2
00000164: conv.i.v
00000168: call action_if_dice(argc=1)
00000170: pop.v.v local.__b__
00000178: push.local.v local.__b__
00000180: conv.v.b
00000184: bf 0x213AE48
00000188: call action_kill_object(argc=0)
00000190: popz