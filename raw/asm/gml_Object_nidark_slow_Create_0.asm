// gml_Object_nidark_slow_Create_0  locals=2 args=0 len=432
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 60
0000000C: conv.i.v
00000010: call action_set_alarm(argc=2)
00000018: popz
0000001C: push.imm.e 2
00000020: conv.i.v
00000024: push.imm.e 2400
00000028: conv.i.v
0000002C: call action_set_alarm(argc=2)
00000034: popz
00000038: push.imm.e 2
0000003C: conv.i.v
00000040: call action_if_dice(argc=1)
00000048: pop.v.v local.__b__
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x213AEC4
00000060: push.imm.e -3990
00000064: pop.v.i depth
0000006C: b 0x213AED0
00000070: push.imm.e 20
00000074: pop.v.i depth
0000007C: push.imm.e 2
00000080: conv.i.v
00000084: call action_if_dice(argc=1)
0000008C: pop.v.v local.__b__
00000094: push.local.v local.__b__
0000009C: conv.v.b
000000A0: bf 0x213AF6C
000000A4: push.imm.e 2
000000A8: conv.i.v
000000AC: call action_if_dice(argc=1)
000000B4: pop.v.v local.__b__
000000BC: push.local.v local.__b__
000000C4: conv.v.b
000000C8: bf 0x213AF48
000000CC: push.imm.e 1
000000D0: conv.i.v
000000D4: push.imm.e 0
000000D8: conv.i.v
000000DC: push.imm.e 671
000000E0: conv.i.v
000000E4: call action_sprite_set(argc=3)
000000EC: popz
000000F0: b 0x213AF6C
000000F4: push.imm.e 1
000000F8: conv.i.v
000000FC: push.imm.e 0
00000100: conv.i.v
00000104: push.imm.e 673
00000108: conv.i.v
0000010C: call action_sprite_set(argc=3)
00000114: popz
00000118: push.imm.e 2
0000011C: conv.i.v
00000120: call action_if_dice(argc=1)
00000128: pop.v.v local.__b__
00000130: push.local.v local.__b__
00000138: conv.v.b
0000013C: bf 0x213AFB4
00000140: push.imm.e 7
00000144: conv.i.v
00000148: push.imm.e 30
0000014C: conv.i.v
00000150: call action_set_motion(argc=2)
00000158: popz
0000015C: b 0x213AFD0
00000160: push.imm.e 4
00000164: conv.i.v
00000168: push.imm.e 30
0000016C: conv.i.v
00000170: call action_set_motion(argc=2)
00000178: popz
0000017C: push.imm.e 2
00000180: conv.i.v
00000184: call action_if_dice(argc=1)
0000018C: pop.v.v local.__b__
00000194: push.local.v local.__b__
0000019C: conv.v.b
000001A0: bf 0x213B004
000001A4: call action_kill_object(argc=0)
000001AC: popz