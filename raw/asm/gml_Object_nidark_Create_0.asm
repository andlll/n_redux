// gml_Object_nidark_Create_0  locals=2 args=0 len=484
// locals: arguments, __b__
00000000: push.imm.e 2
00000004: conv.i.v
00000008: call action_if_dice(argc=1)
00000010: pop.v.v local.__b__
00000018: push.local.v local.__b__
00000020: conv.v.b
00000024: bf 0x213B2D8
00000028: call action_kill_object(argc=0)
00000030: popz
00000034: push.imm.e 2
00000038: conv.i.v
0000003C: push.imm.e 2400
00000040: conv.i.v
00000044: call action_set_alarm(argc=2)
0000004C: popz
00000050: push.imm.e 0
00000054: conv.i.v
00000058: push.imm.e 60
0000005C: conv.i.v
00000060: call action_set_alarm(argc=2)
00000068: popz
0000006C: push.imm.e 25
00000070: conv.i.v
00000074: call action_if_dice(argc=1)
0000007C: pop.v.v local.__b__
00000084: push.local.v local.__b__
0000008C: conv.v.b
00000090: bf 0x213B348
00000094: push.imm.e -3990
00000098: pop.v.i depth
000000A0: b 0x213B354
000000A4: push.imm.e 20
000000A8: pop.v.i depth
000000B0: push.imm.e 2
000000B4: conv.i.v
000000B8: call action_if_dice(argc=1)
000000C0: pop.v.v local.__b__
000000C8: push.local.v local.__b__
000000D0: conv.v.b
000000D4: bf 0x213B3F0
000000D8: push.imm.e 2
000000DC: conv.i.v
000000E0: call action_if_dice(argc=1)
000000E8: pop.v.v local.__b__
000000F0: push.local.v local.__b__
000000F8: conv.v.b
000000FC: bf 0x213B3CC
00000100: push.imm.e 1
00000104: conv.i.v
00000108: push.imm.e 0
0000010C: conv.i.v
00000110: push.imm.e 671
00000114: conv.i.v
00000118: call action_sprite_set(argc=3)
00000120: popz
00000124: b 0x213B3F0
00000128: push.imm.e 1
0000012C: conv.i.v
00000130: push.imm.e 0
00000134: conv.i.v
00000138: push.imm.e 673
0000013C: conv.i.v
00000140: call action_sprite_set(argc=3)
00000148: popz
0000014C: push.imm.e 2
00000150: conv.i.v
00000154: call action_if_dice(argc=1)
0000015C: pop.v.v local.__b__
00000164: push.local.v local.__b__
0000016C: conv.v.b
00000170: bf 0x213B438
00000174: push.imm.e -14
00000178: conv.i.v
0000017C: push.imm.e 30
00000180: conv.i.v
00000184: call action_set_motion(argc=2)
0000018C: popz
00000190: b 0x213B454
00000194: push.imm.e -8
00000198: conv.i.v
0000019C: push.imm.e 30
000001A0: conv.i.v
000001A4: call action_set_motion(argc=2)
000001AC: popz
000001B0: push.imm.e 2
000001B4: conv.i.v
000001B8: call action_if_dice(argc=1)
000001C0: pop.v.v local.__b__
000001C8: push.local.v local.__b__
000001D0: conv.v.b
000001D4: bf 0x213B488
000001D8: call action_kill_object(argc=0)
000001E0: popz